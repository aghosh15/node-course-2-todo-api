const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID("5b5ecc5e2f2382eee85f99d8")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {console.log(res)});

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b5ea6b1aa5b4a7f9d47b7db")
    }, {
        $set: {
            name: 'Anirban'
        },
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((res) => {console.log(res)});

    // db.close();
});