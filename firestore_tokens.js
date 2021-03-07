const firebase = require("firebase/app");
var serviceAccount = require("./wt21key.json");

require("dotenv").config();

let registrationTokens = []
async function getTokens(admin) {
    const db = admin.firestore();
    const devices = db.collection('devices');
    const markers = [];
    let reg= [];
    await devices.get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                markers.push(doc.data());
            });
        });

    markers.map(obj => reg.push(obj.token))
    return reg
}

exports.getTokens= getTokens
