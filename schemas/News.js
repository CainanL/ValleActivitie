const mongoose = require('mongoose');

const News = mongoose.Schema({
    posterId: {type: String, required: true},
    title: {type: String, required: true, minlenght: 3, maxlenght: 50},
    text: {type: String, required: true, minlenght: 10},
    imageLink: {type: String, default: null},
    createDate: {type: Date, default: Date.now},    
})

module.exports = mongoose.model('News', News);