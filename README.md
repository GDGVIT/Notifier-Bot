<p align="center">
<a href="https://dscvit.com">
	<img src="https://user-images.githubusercontent.com/30529572/92081025-fabe6f00-edb1-11ea-9169-4a8a61a5dd45.png" alt="DSC VIT"/>
</a>
	<h2 align="center"> Notifier </h2>
	<h4 align="center"> A Discord Bot written in JavaScript that makes announcement to other channels. Also, pushes Notifications to FCM. <h4>
</p>

---
[![Join Us](https://img.shields.io/badge/Join%20Us-Developer%20Student%20Clubs-red)](https://dsc.community.dev/vellore-institute-of-technology/)
[![Discord Chat](https://img.shields.io/discord/760928671698649098.svg)](https://discord.gg/498KVdSKWR)

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=flat-square&logo=appveyor)](https://discord.com/developers/docs/intro)
> FCM (Firebase Cloud Messaging) is a service by Google Firebase to send notifications to Registered Android and iOS devices.

## Features

- [X] Sends notifications to other channels.
- [X] Ping Roles
- [X] Sends messages to FCM

<br>

## Dependencies
 - Discord.js
 - firebase
 - Firebase Admin SDK (firebase-admin)

## Running

Directions to install

```bash
npm install
```

* Issue a Bot token for your bot on the **Discord Developer Console**. invite your Discord Bot to the server with Admin
  Permissions.
* In the _.env_ enter your discord bot token. Refer to _.env_sample_ for the same.
* Enter prefix for the bot, **ID** of the role to be pinged, along with the **Role Names** of the users having
  permissions to run the bot in the _config_sample.json_ and change the name to _config.json_.
* In the files _index.js_ and _firebase_tokens.js_ change the
  path `var serviceAccount = require("./FIREBASE_ADMIN_SDK.json")` to your Firebase Admin SDK credentials. For more
  information refer to [Firebase Setup Documentation](https://firebase.google.com/docs/admin/setup).
* In the files _firebase_tokens.js_ change `ENTER_COLLECTION_NAME_HERE` to the Collection Name for your token documents
  in Cloud Firestore.

Directions to execute

```bash
npm start
```

## Contributors

<table>
	<tr align="center">
        <td>

Vishesh Bansal

<p align="center">
<img src = "https://avatars.githubusercontent.com/VisheshBansal" width="150" height="150" alt="Vishesh Bansal">
</p>
<p align="center">
<a href = "https://github.com/VisheshBansal"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36" alt="GitHub"/></a>
<a href = "https://www.linkedin.com/in/bansalvishesh">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>

</tr>
</table>

<p align="center">
	Made with :heart: by <a href="https://dscvit.com">DSC VIT</a>
</p>