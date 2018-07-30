//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// // ES6 Destructuring
// let user = {name: 'Anirban', age: 27};
// let {name} = user;
// console.log(name);

// const obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    //Users: name, age, location string
    // db.collection('Users').insertOne({
    //     name: 'Anirban',
    //     age: 27,
    //     location: 'Columbia, MD'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     // console.log(JSON.stringify(res.ops, undefined, 2));
    //     console.log(res.ops[0]._id.getTimestamp());
    // });

    db.close();
})
