const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const admin = require("firebase-admin");

var serviceAccount = require("./firebase_key/peer-connect-16fe4-e036def79cc0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://peer-connect-16fe4.firebaseio.com",
});

const db = admin.firestore();

//Akshat wrote this one line below
db.settings({ timestampsInSnapshots: true });

module.exports = { admin, db, firebase };
