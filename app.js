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

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, psw)
    .then(function(success) {
      db.collection("users")
        .add({ email, name, uid: success.user.uid })
        .then(function() {
          window.location.replace("home.html");
          alert("user Sign up succesfully");
        });
    })
    .catch(function(error) {
      alert(error);
    });
}

function login() {
  let email = document.getElementById("email").value;
  let psw = document.getElementById("psw").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, psw)
    .then(function(user) {
      localStorage.setItem("uid", user.user.uid);
      window.location.replace("home.html");
      alert("user Sign up succesfully");
    })
    .catch(function(error) {
      alert(error);
    });
}

function reset() {
  let email = document.getElementById("email").value;

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      alert("Email Sent To Your Email Address");
    })
    .catch(function(error) {
      alert(error);
    });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function mount() {
  getProfile();
  getAllAds();
}

function getProfile() {
  if (localStorage.getItem("uid")) {
    db.collection("users")
      .where("uid", "==", localStorage.getItem("uid")) // .where('key', '==', value)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          document.getElementById("userName").style.color = "white";
          document.getElementById("userEmail").style.color = "white";
          document.getElementById("userName").innerHTML = doc.data().name;
          document.getElementById("userEmail").innerHTML = doc.data().email;
        });
      })
      .catch(function(error) {
        alert(error);
      });
  } else {
    window.location.replace("index.html");
  }
}

function logout() {
  localStorage.removeItem("uid");
  window.location.replace("index.html");
  alert("logout successfully");
}

function post() {
  let title = document.getElementById("Title").value;
  let price = document.getElementById("Price").value;
  let Description = document.getElementById("Description").value;

  db.collection("ads")
    .add({
      title,
      price,
      Description,
      uid: localStorage.getItem("uid")
    })
    .then(() => {
      alert("your add is live on olx");

      document.getElementById("Title").value = "";
      document.getElementById("Price").value = "";
      document.getElementById("Description").value = "";
    });
}

function getAllAds() {
  db.collection("ads").onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      factory(change.doc.data(), change.doc.id);
    });
  });
}

function factory(data, id) {
  
  let container = document.getElementById("ads");
  let div = document.createElement("div");
  let h5 = document.createElement("h5");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");

  let title = document.createTextNode(data.title);
  let price = document.createTextNode(data.price);
  let Description = document.createTextNode(data.Description);

  h3.appendChild(title)
  h5.appendChild(price)
  p.appendChild(Description)
  
  div.appendChild(h3)
  div.appendChild(h5)
  div.appendChild(p)

  container.appendChild(div)

}
