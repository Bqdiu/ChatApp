const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'provide name']
    },
    email: {
        type: String,
        require: [true, 'provide email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'provide password'],
    },
    profile_pic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
