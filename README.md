# Firebase Firestore learning

Operations are asynchronous so use `then().catch()`, here is the [official documentation](https://cloud.google.com/firestore/docs/)

### Configuration

1. hook the project with firestore in firebase console

```javascript
var firebaseConfig = {
  apiKey: "an-api-key",
  authDomain: "a-url",
  databaseURL: "a-url",
  projectId: "a-project-id",
  storageBucket: "a-url",
  messagingSenderId: "an-id",
  appId: "an-app-id"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

2. add firebase js package

```html
<script src="https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js"></script>
```

3. add firestore js package

```html
<script src="https://www.gstatic.com/firebasejs/7.5.2/firebase-firestore.js"></script>
```

### Usage

1. creating database instance

```javascript
const db = firebase.firestore();
```

2. referencing a collection

```javascript
db.collection("collection-name");
```

3. fetching all documents in a collection

```javascript
db.collection("collection-name").get();
```

4. referencing a document

```javascript
db.collection("collection-name").doc("document-id");
```

5. inserting a new document

```javascript
db.collection("collection-name").add({});
```

6. updating a document

   - only specific data

     ```javascript
     db.collection("collection-name")
       .doc("document-id")
       .update({});
     ```

     > **Note**: only the specified data of the document will be updated, ex: if the document with id 'NTxSKLBJz6bd97Uey1xU' has name & city fields and you specify **name** value in the `update({name: 'name'})`, city will not be modified.

   - all data

     ```javascript
     db.collection("collection-name")
       .doc("document-id")
       .set({});
     ```

7. querying a document

```javascript
db.collection("collection-name")
  .doc("document-id")
  .delete();
```

8. querying a document

```javascript
db.collection("collection-name")
  .doc("document-id")
  .where("field-name", "operator", "value")
  .get();
```

> **Note**: value in the condition is case sensitive.

9. ordering a query result

```javascript
db.collection("collection-name")
  .doc("document-id")
  .orderBy("field-name")
  .get();
```

10. listening to changes in a specific collection

```javascript
db.collection("collection-name").onSnapshot(function(snapshot) {
  let changes = snapshot.docChanges();
  changes.forEach(function(change) {
    // an item has been added
    if (change.type === "added") {
      // instructions
    }
    // an item has been modified
    if (change.type === "edited") {
      // instructions
    }
    // an item has been removed
    if (change.type === "removed") {
      // instructions
    }
  });
});
```
