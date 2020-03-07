var firebaseConfig = {
  apiKey: "AIzaSyBILgJ8J9-NUiWlHv7S5WGX6ungdxOUPwI",
  authDomain: "olx-web-ap.firebaseapp.com",
  databaseURL: "https://olx-web-ap.firebaseio.com",
  projectId: "olx-web-ap",
  storageBucket: "olx-web-ap.appspot.com",
  messagingSenderId: "1011068236934",
  appId: "1:1011068236934:web:99df4ce6044030711c8d07"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let psw = document.getElementById("psw").value;

  firebase.auth().createUserWithEmailAndPassword(email, psw)
    .then(function(success) {
      db.collection("users").add({email,name,uid: success.user.uid})
      .then(function(){
          window.location.replace("home.html")
          alert('user Sign up succesfully')
      })
    }).catch(function(error) {
      alert(error);
    });
}


function login() {
  let email = document.getElementById("email").value;
  let psw = document.getElementById("psw").value;

  firebase.auth().signInWithEmailAndPassword(email, psw)
  .then(function (user) {
    localStorage.setItem('uid', user.user.uid)
    window.location.replace("home.html")
    alert('user Sign up succesfully')
  })
  .catch(function(error) {
      alert(error);
   });
}


function reset() {
    let email = document.getElementById("email").value;
  
    firebase.auth().sendPasswordResetEmail(email)
    .then(function () {
        alert('Email Sent To Your Email Address')
    })
    .catch(function(error){
        alert(error)
    })
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function getProfile(){
    db.collection("users").where("uid", "==", localStorage.getItem('uid'))
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            document.getElementById("userName").style.color = 'white';
            document.getElementById("userEmail").style.color = 'white';
            document.getElementById("userName").innerHTML=doc.data().name;
            document.getElementById("userEmail").innerHTML=doc.data().email;
        });
    })
    .catch(function(error) {
        alert(error);
    });

}