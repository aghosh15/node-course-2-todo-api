const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({})     // Clears Todos by passing in empty array
    .then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
};

const user1ID = new ObjectID();
const user2ID = new ObjectID();
const users = [{
    _id: user1ID,
    email: 'anirban@example.com',
    password: 'user1Pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: user1ID,
            access: 'auth'
        }, 'abc123').toString()
    }]
},
{
    _id: user2ID,
    email: 'andrew@example.com',
    password: 'user2Pass'
}];

const populateUsers = (done) => {
    User.remove({})
    .then(() => {
        // We need to explicitly call save() so our authenticate middleware is run
        const user1 = new User(users[0]).save();
        const user2 = new User(users[1]).save();

        return Promise.all([user1, user2]);
    })
    .then(() => done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};
