const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const newsController = {

    createNews: (req, res)=>{
        //add async await
        res.send('create news');
    },

    readNews: (req, res)=>{
        //add async await
        res.send('read news');
    },

    updateNews: (req, res)=>{
        //add async await
        res.send('update news');
    },

    deleteNews: (req, res)=>{
        //add async await
        res.send('delete news');
    }
}

module.exports = newsController;