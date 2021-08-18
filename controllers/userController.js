const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {

    login: (req, res)=>{
        //add async await
        res.send('Login');
    },

    registerUser: (req, res)=>{
        //add async await
        res.send('comum user registered');
    },

    registerAdmin: (req, res)=>{
        //add async await
        res.send('admin registered');
    },

    editUser: (req, res)=>{
        //add async await
        res.send('user edited');
    },

    deletUser: (req, res)=>{
        //add async await
        res.send('user deleted');
    }
}

module.exports = userController;