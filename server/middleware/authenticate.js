const {User} = require('./../models/user');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth'); // this is a get method on req and a set on res

    User.findByToken(token)
    .then((user) => {
        if (!user) {
            return Promise.reject(); // Throws an error and skips to catch
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports = {
    authenticate
};
