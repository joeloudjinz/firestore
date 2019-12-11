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
 const cafeForm = document.querySelector('#add-cafe-form');

 // create elements & render the list
 function renderCafeList(doc) {
     let li = document.createElement('li');
     let name = document.createElement('span');
     let city = document.createElement('span');
     let cross = document.createElement('div');

     // retrieving the id of the document
     li.setAttribute('data-id', doc.id);
     name.textContent = doc.data().name;
     city.textContent = doc.data().city;
     cross.textContent = 'x';

     li.appendChild(name);
     li.appendChild(city);
     li.appendChild(cross);

     cafeList.appendChild(li);

     cross.addEventListener('click', function (event) {
         event.stopPropagation();
         // target is 'cross' element
         // parentElement is 'li' element
         let id = event.target.parentElement.getAttribute('data-id');
         // doc(id) selects the document with the given id
         db.collection('cafes').doc(id).delete();
     });
 }
 //  fetching cafe's collection data
 db.collection('cafes')
     // it is case sensitive, capital letters sorted before lower case letters.
     .orderBy('name')
     .get()
     .then((snapshot) => {
         //  map throw all the documents 
         snapshot
             .docs
             //  print out the data of the current document
             .map((doc) => renderCafeList(doc));
     }).catch((error) => {
         console.log(error);
     });

 // fetching results based on the condition in where clause
 //  db.collection('cafes')
 // value in the condition is case sensitive.
 // this will select documents that have the city value starts with
 // a letter that comes after 'B' in the alphabets.
 // .where('city', '>', 'B')
 //  .where('city', '==', 'In-Salah')
 //  .get()
 //  .then((snapshot) => {
 //      //  map throw all the documents 
 //      snapshot
 //          .docs
 //          //  print out the data of the current document
 //          .map((doc) => renderCafeList(doc));
 //  }).catch((error) => {
 //      console.log(error);
 //  });

 cafeForm.addEventListener('submit', function (event) {
     event.preventDefault();
     // saving data to cafe's collection
     db.collection('cafes').add({
         name: cafeForm.name.value,
         city: cafeForm.city.value,
     });

     cafeForm.name.value = '';
     cafeForm.city.value = '';
 });