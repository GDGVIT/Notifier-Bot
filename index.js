const Discord = require('discord.js');
require('dotenv').config();
const {prefix} = require('./config.json')
const {post_channel} = require('./config.json')
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN)
    .then(r => console.log('logged in:' + r))
    .catch(err => {
        console.log(err)
    })

client.once('ready', () => {
    console.log('Logged in');
})
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error)
})
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.content.startsWith(`${prefix}${prefix}`) || message.author.bot) {
        return
    }
    const message_body = message.content.slice((prefix + 'post').length).trim()
    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
        case 'post':
            const ann_channel = client.channels.cache.find(channel => channel.name === post_channel)
            ann_channel.send(message_body)
            break
        case 'server':
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
            break
        default:
            message.channel.send('What are you sayin\' bro?? That\'s not a command!')
            message.channel.send('Use `~help` to know the commands.')
            break
    }
})