import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {userCreatedFunction} from "./userCreatedFunction";
import {questionCreatedFunction} from "./questionCreatedFunction";

admin.initializeApp();
const fireDb = admin.firestore();

/* On user created  */
export const userCreated = functions.auth
    .user()
    .onCreate(async (user) => {
      await userCreatedFunction(user, fireDb);
    });

/* On question created  */
export const questionCreated = functions.firestore
    .document("bots/{botId}/questions/{questionId}")
    .onWrite( async (change, context) => {
      await questionCreatedFunction(change, context, fireDb);
    });
