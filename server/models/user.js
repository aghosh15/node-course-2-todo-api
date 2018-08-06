const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
