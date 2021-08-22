const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/User');
const userValidate = require('../validate/userValidate')

const userController = {

    login: async (req, res)=>{        
        //Data validate
        const {error} = userValidate.login(req.body);
        if(error) return res.status(400).send(error.message);

        //Search user in database
        const user = await User.findOne({email: req.body.email});
        if(!user) res.status(400).send("Email dosen't exist");

        //compare password
        const verifiedPassword = bcrypt.compareSync(req.body.password, user.password);

        //user response
        if(verifiedPassword){
            const token = jwt.sign({_id: selectedUser}, process.env.TOKEN_KEY);
            res.send([token]);
        }
    },

    registerUser: async (req, res)=>{
        const {error} = userValidate.register(req.body);
        if(error) res.status(400).send(error.message);

        const selecteduser = await User.findOne({email: req.body.email});
        if (selecteduser) res.status(400).send('Email allready exist');

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin ? true : false
        })

        try{
            const saved = await user.save();
            res.send(savedUser);
        }catch(error){
            res.status(400).send(error);
        }
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