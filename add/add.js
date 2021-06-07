
'use-struct'

const db = firebase.firestore();
db.collection("restaurants").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().Name);
  });
});