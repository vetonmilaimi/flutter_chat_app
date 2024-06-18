const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.myFunction = functions.firestore
  .document("chat/{messageId}")
  .onCreate((snapshot, context) => {
    return admin.messaging().send({
      notification: {
        title: snapshot.data()["username"],
        body: snapshot.data()["text"],
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
      topic: "chat",
    });
  });
