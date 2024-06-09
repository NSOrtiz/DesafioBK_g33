const createError = require('http-errors');

const Users = require('../models/user.model');
const encrypt = require('../lib/encrypt');
const jwt = require('../lib/jwt');

async function login (email, password){
    const user = await Users.findOne({email: email});

    if(!user){
        throw createError(401, 'Invalid email');
    };

    const isPasswordValid = await encrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw createError(401, 'Invalid password');
    };
    const token = jwt.sign({id: user._id});
    return token;
};

module.exports = {
    login,
}