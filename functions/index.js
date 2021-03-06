const admin = require("firebase-admin");
const functions = require("firebase-functions");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.addEmployee = functions.https.onCall(async (data, context) => {
  const { details } = data;
  const db = admin.firestore();
  const employeeCounterDocRef = db.collection("counters").doc("employees");
  try {
    const newCount =
      (await db.collection("counters").doc("employees").get()).data().count + 1;
    let concat = "00000000" + newCount;
    const id = "EM" + concat.substring(concat.length - 8);
    await admin.auth().createUser({
      uid: id,
      email: details.email,
      password: details.password,
    });
    const { password, ...rest } = details;
    db.collection("employees").doc(id).set(rest);
    db.collection("counters").doc("employees").set({ count: newCount });
  } catch (e) {
    throw new functions.https.HttpsError("internal", "Transaction failed");
  }
});

exports.createDoc = functions.firestore
  .document("{collectionID}/{userID}")
  .onCreate((snap, context) => {
    const collectionID = context.params.collectionID;
    if (collectionID == "logs" || collectionID == "counters") return;

    const newValue = snap.data();

    admin
      .firestore()
      .collection("logs")
      .add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: "create",
        data: { id: snap.id, ...newValue },
      });
  });

exports.updateDoc = functions.firestore
  .document("{collectionID}/{userID}")
  .onUpdate((change, context) => {
    const collectionID = context.params.collectionID;
    if (collectionID == "logs" || collectionID == "counters") return;

    const newValue = change.after.data();
    const previousValue = change.before.data();

    admin
      .firestore()
      .collection("logs")
      .add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: "update",
        data: { id: change.after.id, ...previousValue },
        newData: newValue,
      });
  });

exports.deleteDoc = functions.firestore
  .document("{collectionID}/{userID}")
  .onDelete((snap, context) => {
    const collectionID = context.params.collectionID;
    if (collectionID == "logs" || collectionID == "counters") return;

    const deletedValue = snap.data();

    admin
      .firestore()
      .collection("logs")
      .add({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: "delete",
        data: { id: snap.id, ...deletedValue },
      });
  });
