const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

Todo.findOneAndRemove({_id: '5b615d932f2382eee85fae2b'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b615d932f2382eee85fae2b').then((todo) => {
    console.log(todo);
});
