db.collection("demo")
    .orderBy("createdAt", "desc")
    .onSnapshot(collection => {
        const demoList = [];
        collection.forEach(doc => {
            const demo = doc.data();
            demoList.push(demo);
        });
        console.log(demoList);
        $('#demoListOL').empty();
        demoList.forEach(demo => {
            $('#demoListOL').append(`<li>
      Name: ${demo.name} Age: ${demo.age}
      </li>`);
        })

    })

db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: true
})
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });

db.collection("cities")
    .where("capital", "==", true)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });



window.alert("this is js!!")
const textarea = document.getElementById("textarea")
const btn_textarea = document.getElementById("btn_textarea")

function submitClick() {
    window.alert("btn_textarea is working")
    const firebaseRef = firebase.database().ref()
    firebaseRef.child("text").set("some value")
}