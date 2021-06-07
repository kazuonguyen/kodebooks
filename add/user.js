
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
  db.collection("restaurants")
  .get()
  .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
              let data = doc.data();
              let row  = `<tr><td>${data.name}</td>
              <td>${data.category}</td>
            <td>${data.city}</td>
                              <td>${doc.id}</td>
                           
                     
                        </tr>`;
              let table = document.getElementById('myTable')
              table.innerHTML += row
          })
      })
      .catch(err=>{
          console.log(`Error: ${err}`)
      });


function DeleteUs(){
  var idd = prompt("Please enter id that will delete:",);
  db.collection("restaurants").doc(idd).delete().then(() => {
    console.log("Document successfully deleted!");
    location.reload();
})
}