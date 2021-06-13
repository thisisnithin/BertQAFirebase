import {auth} from "firebase-admin/lib/auth";
import UserRecord = auth.UserRecord;

type User = {
    name : string;
    email : string;
}

export async function userCreatedFunction(user: UserRecord, fireDb: FirebaseFirestore.Firestore) {
  const userObj : User = {
    name: `${user.displayName}`,
    email: `${user.email}`,
  };
  fireDb
      .collection("users")
      .doc(user.uid)
      .set(
          userObj
      )
      .then(function(result) {
        console.log("Result" + result + " user " + user.uid + " created successfully. ");
      })
      .catch(function(error) {
        console.error("Error creating user " + error);
      });
}
