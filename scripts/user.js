
'use strict';

const db = firebase.firestore();
db.collection("users ").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().Name);
  });
});
console.log("Initialisation Successful!");

var exRef = db.collection('restaurants');
var allex = exRef
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
        var EName = doc.data().name;
        // var Type = doc.data().Type;
        // var BodyPart = doc.data(). BodyPart;
        // var Sets = doc.data().Sets;
        // const Image = doc.data().Image;

        document.getElementById("ename").value = EName;   
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
  db.collection("users ")
  .get()
  .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              let data = doc.data();
              let row  = `<tr>     
                             <td>${data.Name}</td>
                             <td>${data.Numbers}</td>
                             <td>${data.sdt}</td>
                             <td>${data.borrowed}</td>

                             
                              <td>${doc.id}</td>
                        </tr>`;
              let table = document.getElementById('myTable')
              table.innerHTML += row
          })
      })
      .catch(err=>{
          console.log(`Error: ${err}`)
      });

function addUser(){
  var name = prompt("Please enter user name:",);
  var number = prompt("Numbers",);
  var ch = true;



  db.collection("users ").add({
      Name:name,
      Numbers: number,
      check: ch
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    location.reload();

})
.catch((error) => {
    console.error("Error adding document: ", error);
});

}
function DeleteUs(){
  var idd = prompt("Please enter id that will delete:",);
  db.collection("users ").doc(idd).delete().then(() => {
    console.log("Document successfully deleted!");
    location.reload();
})

}