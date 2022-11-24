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
        default: 'NA'
    },
    weight: {
        type: String,
        required: false,
        default: 'NA'
    },
    age: {
        type: String,
        required: false,
        default: 'NA'
    },
    gender: {
        type: String,
        required: false,
        default: 'NA'
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema, 'users');