const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

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
        }, process.env.JWT_SECRET).toString()
    }]
},
{
    _id: user2ID,
    email: 'andrew@example.com',
    password: 'user2Pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: user2ID,
            access: 'auth'
        }, process.env.JWT_SECRET).toString()
    }]
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

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: user1ID
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: user2ID
}];

const populateTodos = (done) => {
    Todo.remove({})     // Clears Todos by passing in empty array
    .then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};
