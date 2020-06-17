const admin = require('firebase-admin');
const serviceAccount = require("../cattle-5e795-3496bd6ce619.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cattle-5e795.firebaseio.com"
  });
  const db = admin.firestore();
module.exports = {admin,db};