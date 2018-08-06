const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Arrow functions don't bind a *this* keyword. The function keyword does
UserSchema.methods.toJSON = function() {
    let user = this;
    const userObject = user.toObject(); // Converts Mongoose object to a regular one

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    // using concat instead of push, push may not work in newer versions
    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};



// This defines model methods and properties instead of instance methods and properties
UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    }
    catch (err){
        return Promise.reject();
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,   // This is how we query a nested document
        'tokens.access': 'auth'
    });   // returns a Promise so we can chain this
};

UserSchema.statics.findByCredentials = function(email, password) {
    const User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                return res ? resolve(user) : reject();
            });
        });
    });
};

// Mongoose middleware
// We have to use function keyword again because of *this*
UserSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
