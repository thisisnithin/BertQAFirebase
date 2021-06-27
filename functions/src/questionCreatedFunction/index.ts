import fetch from "node-fetch";
import {Change, EventContext} from "firebase-functions";
import {firestore} from "firebase-admin/lib/firestore";
import DocumentSnapshot = firestore.DocumentSnapshot;

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
  console.log("Context", contexts);


  /* Ping flask server */

  const hostName = "https://bert-qa-6v3rygz7nq-as.a.run.app";
  const path = "/ask-question";

  const requestBody = {
    question: question,
    context: contexts,
  };


  const response = await fetch(hostName + path, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-type": "application/json",
    },
  });


  if (response.status == 200) {
    const responseJSON = await response.json();
    console.log("RESPONSE_JSON", JSON.stringify(responseJSON));

    let message = "";
    if (responseJSON.success == false) message = responseJSON.msg;
    else message = responseJSON.answers[0];

    fireDb.doc(change.after.ref.path).set({
      question: question,
      answer: message,
    }).then((result) => {
      console.log("Result" + result);
      return 200;
    }).catch((error) => {
      console.error("Error writing answer " + error);
      return 500;
    });
  } else {
    console.error("Server error" + response.body);
    return 500;
  }

  return 0;
}
