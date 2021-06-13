import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {userCreatedFunction} from "./userCreatedFunction";
import {botCreatedFunction} from "./botCreatedFunction";
import {questionCreatedFunction} from "./questionCreatedFunction";

admin.initializeApp();
const fireDb = admin.firestore();

/* On user created  */
export const userCreated = functions.auth
    .user()
    .onCreate(async (user) => {
      await userCreatedFunction(user, fireDb);
    });

/* On bot created  */
export const botCreated = functions.firestore
    .document("bots")
    .onWrite(async (change, context) => {
      await botCreatedFunction(change, context);
    });

/* On question created  */
export const questionCreated = functions.firestore
    .document("bots/{bodId}/queries")
    .onWrite(async (change, context) => {
      await questionCreatedFunction(change, context);
    });