const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {type: String, required: true, minlenght: 6, maxlenght: 100},
    email: {type: String, required: true, minlenght: 7, maxlenght: 50},
    password: {type: String, required: true, minlenght: 8, maxlenght:50},
    admin: {type: Boolean, default: false},
    createDate: {type: Date, default: Date.now},    
})

module.exports = mongoose.model('User', User);