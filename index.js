const Discord = require("discord.js");
require("dotenv").config();
const {prefix} = require("./config.json");
const {post_channel} = require("./config.json");
const {perm_roles} = require("./config.json");
const {pingable_role} = require("./config.json");
var admin = require("firebase-admin");
const firebase = require("firebase/app");
var serviceAccount = require("./wt21key.json");
const getInfo = require("./firestore_tokens");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const client = new Discord.Client();

client
    .login(process.env.BOT_TOKEN)
    .then((r) => console.log("logged in:" + r))
    .catch((err) => {
        console.log(err);
    });

client.once("ready", () => {
    console.log("Logged in");
});
client.on("shardError", (error) => {
    console.error("A websocket connection encountered an error:", error);
});
client.on("message", async (message) => {

    try {
        //message.member.roles.cache.find(role => console.log(role.name))
        var flag = "false";
        for (var roles in perm_roles) {
            if (message.member.roles.cache.some(role => (role.name === perm_roles[roles]) == true)) {
                flag = "true";
                break;
            }
        }
        if (flag === "true") {
            if (
                !message.content.startsWith(prefix) ||
                message.content.startsWith(`${prefix}${prefix}`) ||
                message.author.bot
            ) {
                return;
            }
            const message_body = message.content.slice((prefix + "post").length).trim();
            const fcm_title = message.content.slice((prefix + "post" + "<@> ").length + 18).trim();
            const fcm_message = message.content.slice((prefix + "post" + "<@> ").length + 18).trim();
            const notify_message = message.content.slice((prefix + "notify" + "< @ > ").length + 18).trim();
            const args = message.content.slice(prefix.length).trim().split(" ");
            const command = args.shift().toLowerCase();

            const registrationTokens = await getInfo.getTokens(admin)

            // Announce to a channel
            function announce_channel(message_args) {
                const ann_channel = client.channels.cache.find((channel) => channel.name === post_channel);
                ann_channel.send(message_args);
            }

            // fcm announcer
            function send_fcm_message(message_title, message_args) {
                var message = {
                    notification: {
                        title: message_title,
                        body: message_args,
                    },
                    tokens: registrationTokens,
                };
                admin
                    .messaging()
                    .sendMulticast(message)
                    .then((response) => {
                        // Response is a message ID string.
                        console.log("Successfully sent message:", response);
                    })
                    .catch((error) => {
                        console.log("Error sending message:", error);
                    });
            }

            let msgTitle, response2, response3, msgContent;

            switch (command) {
                case "post":
                    const ann_channel = client.channels.cache.find((channel) => channel.name === post_channel);
                    ann_channel.send(message_body);
                    break;
                case "notify":
                    await message.channel.send("Enter **FCM Message Title**");
                    const response2 = await message.channel.awaitMessages(
                        (m) => m.author.id === message.author.id,
                        {max: 1}
                    );
                    msgTitle = response2.first().content;

                    await message.channel.send("Enter **FCM Message Body**");
                    const response3 = await message.channel.awaitMessages(
                        (m) => m.author.id === message.author.id,
                        {max: 1}
                    );
                    msgContent = response3.first().content;

                    console.log(msgTitle, msgContent);
                    send_fcm_message(msgTitle, msgContent);
                    var role = '<@&';
                    role = role.concat(pingable_role, '>')
                    const msgNotify = role.concat(" ", msgContent);
                    announce_channel(msgNotify);
                    break;


                case "fcm":
                    await message.channel.send("Enter **FCM Message Title**");
                    const resp2 = await message.channel.awaitMessages(
                        (m) => m.author.id === message.author.id,
                        {max: 1}
                    );
                    msgTitle = resp2.first().content;

                    await message.channel.send("Enter **FCM Message Body**");
                    const resp3 = await message.channel.awaitMessages(
                        (m) => m.author.id === message.author.id,
                        {max: 1}
                    );
                    msgContent = resp3.first().content;

                    console.log(msgTitle, msgContent);
                    send_fcm_message(msgTitle, msgContent);
                    break;

                case "server":
                    message.channel.send(
                        `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
                    );
                    break;
                case "help":
                    message.channel.send("Use `~server` to get server stats");
                    message.channel.send("Use `~post` to send messages to announcement channel");
                    message.channel.send("Use `~fcm` to send FCM messages");
                    message.channel.send("Use `~notify` to send both FCM as well as announcements. Using this will ping the role ID as mentioned in your configuration file");
                    break;

                default:
                    message.channel.send("What are you sayin' bro?? That's not a command!");
                    message.channel.send("Use `~help` to know the commands.");
                    break;
            }
        }
    } catch (err) {
        console.log(err)
    }
});
