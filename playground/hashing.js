const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

// // The higher the value of the first parameter, the harder it is to brute-force
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

const hashedPassword = '$2a$10$H2ZN0d4wM/Bet.KonihC5.zkSM.6mMCHfYgbRZ20.PX4jxPn3BQW6';

bcrypt.compare('123abc', hashedPassword, (err, res) => {
    console.log(res);
});

// const data = {
//     id: 10
// };

// const token = jwt.sign(data, /*salt*/'123abc');
// console.log(token);

// const decoded = jwt.verify(token, '123abc');
// console.log('decoded: ', decoded);




// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret' /*salt*/).toString()
// };

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// }
// else {
//     console.log('Data was changed. Do not trust!');
// }

