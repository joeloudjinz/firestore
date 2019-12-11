 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyAZg5WCJnA4T9jLdZ_wuRuimmubLsPUVOY",
     authDomain: "firestore-80a4c.firebaseapp.com",
     databaseURL: "https://firestore-80a4c.firebaseio.com",
     projectId: "firestore-80a4c",
     storageBucket: "firestore-80a4c.appspot.com",
     messagingSenderId: "262603398818",
     appId: "1:262603398818:web:b45fbd310f09974c6981fb"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 // getting a reference to our database
 const db = firebase.firestore();
 // to avoid errors in the console, this is set automatically
 //  db.settings({
 //      timestampsInSnapshots: true
 //  });
 const cafeList = document.querySelector('#cafe-list');

 // create elements & render the list
 function renderCafeList(doc) {
     let li = document.createElement('li');
     let name = document.createElement('span');
     let city = document.createElement('span');
     
     // retrieving the id of the document
     li.setAttribute('data-id', doc.id);
     name.textContent = doc.data().name;
     city.textContent = doc.data().city;

     li.appendChild(name);
     li.appendChild(city);

     cafeList.appendChild(li);
 }
 // fetches a collection by it's name
 db.collection('cafes').get()
     .then((snapshot) => {
         //  map throw all the documents 
         snapshot
             .docs
             //  print out the data of the current document
             .map((doc) => renderCafeList(doc));
     }).catch((error) => {
         console.log(error);
     });