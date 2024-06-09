const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:100,
    },
    profilePic:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    password:{
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
    },
});

module.exports = mongoose.model('user', schema)