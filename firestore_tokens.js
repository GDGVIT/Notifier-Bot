const firebase = require("firebase/app");
var serviceAccount = require("./FIREBASE_ADMIN_SDK.json");

require("dotenv").config();

let registrationTokens = []
async function getTokens(admin) {
    const db = admin.firestore();
    const devices = db.collection('ENTER_COLLECTION_NAME_HERE');
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
