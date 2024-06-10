const createError = require('http-errors');
const encrypt = require('../lib/encrypt');
const Users = require('../models/user.model');

async function createUser(userData){
    const userFound = await Users.findOne({email: userData.email});
    if(userFound){
        throw createError(409, 'Email already in use');
    };
    const password = await encrypt.encrypt(userData.password);
    userData.password = password;
    const newUser = await Users.create(userData);
    return newUser;
};

async function getUserById(id){
    const user = await Users.findById(id);
    return user;
}

async function updateUserById(id, newUserData){
    newUserData.updated_at = new Date();
    const updateUser = await Users.findByIdAndUpdate(id, newUserData, {new: true});
    return updateUser;
}

module.exports = {
    createUser,
    getUserById,
    updateUserById,
}