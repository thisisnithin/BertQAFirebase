import {Change, EventContext} from "firebase-functions";
import {firestore} from "firebase-admin/lib/firestore";
import DocumentSnapshot = firestore.DocumentSnapshot;
// import https = require("https");

export async function questionCreatedFunction(
    change: Change<DocumentSnapshot>,
    context: EventContext,
    fireDb: FirebaseFirestore.Firestore
): Promise<number> {
  /* Get all data */
  const changeData = change.after.data();
  const parentDoc = await change.after.ref.parent.parent?.get();

  const question = changeData?.question;
  const contexts = parentDoc?.data()?.context;

  console.log("Question", question);
  console.log("Context", contexts.join());

  /* Ping flask server */

  return 200;
}
