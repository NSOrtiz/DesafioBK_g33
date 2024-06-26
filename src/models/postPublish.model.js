const mongoose = require('mongoose');

const modelNameP = 'postpublish'
const schemaP = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2, 
        maxLength: 150,
    },
    image: {
        type: String,
        required: true, 

    },
    body: {
        type: String,
        required: true,
        minLength: 10, 
        maxLength: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    created_at: {
        type: Date,
        default: Date.now,
    }, 
    updated_at: {
        type: Date,
        default: Date.now,
    },

})

module.exports = mongoose.model(modelNameP, schemaP);