const admin = require('firebase-admin');
const serviceAccount = require("../cattle-5e795-3496bd6ce619.json");
const { storageBucket } = require('./conf');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cattle-5e795.firebaseio.com",
    storageBucket : 'cattle-5e795.appspot.com'
  });
  const db = admin.firestore();

module.exports = {admin,db};