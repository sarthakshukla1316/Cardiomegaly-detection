const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema, 'users');