const admin = require("firebase-admin");

var serviceAccount = require("./firebase_key/peer-connect-16fe4-e036def79cc0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://peer-connect-16fe4.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
