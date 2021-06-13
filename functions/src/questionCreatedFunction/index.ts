import {Change, EventContext} from "firebase-functions";
import {firestore} from "firebase-admin/lib/firestore";
import DocumentSnapshot = firestore.DocumentSnapshot;

export async function questionCreatedFunction(change: Change<DocumentSnapshot>, context: EventContext) {
  /* Ping flask server */
}
