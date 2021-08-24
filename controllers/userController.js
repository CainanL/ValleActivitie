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
        if(!user) return res.status(400).send("Email dosen't exist");

        //compare password
        const verifiedPassword = bcrypt.compareSync(req.body.password, user.password);

        //user response
        if(verifiedPassword){
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);
            res.send([token]);
        }else{
            return res.status(400).send('Incorrect password');
        }
    },

    registerUser: async (req, res)=>{
        //Data validate
        const {error} = userValidate.register(req.body);
        if(error) return res.status(400).send(error.message);

        //Check email duplicity
        const selecteduser = await User.findOne({email: req.body.email});
        if (selecteduser) return res.status(400).send('Email allready exist');

        //Prepare user data
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            admin: req.body.admin ? true : false
        })

        //Send to database
        try{
            const saved = await user.save();
            res.send(saved);
        }catch(error){
            res.status(400).send(error);
        }
    },

    editUser: async (req, res)=>{
        //Data validate
        const {error} = userValidate.edit(req.body);
        if(error) return res.status(400).send(error.message);

        //User update
        const editedUser = await User.updateOne({_id: req.body._id}, {
            $set: req.body.password.length >= 6 ? {
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password),
                admin: req.body.admin ? req.body.admin : false
            }:{
                name: req.body.name,
                admin: req.body.admin ? req.body.admin : false
            }
        })

        console.log(editedUser)

        //Response to user
        if(!editedUser) return res.status(400).send('Error: User not found');
        res.send(editedUser);
    },

    deletUser: async (req, res)=>{
        //Data validate
        const {error} = userValidate.delete(req.body);
        if(error) return res.status(400).send(error.message);

        //User delete
        const deletedUser = await User.deleteOne({_id: req.body._id});

        //Response to user
        if(!deletedUser) return res.status(400).send('Error: User not found');
        res.send(deletedUser);
    },

    getName: async (req, res) => {
        //data validate
        const {error} = userValidate.token(req.body);
        if(error) return res.status(400).send(error.message);

        const token = jwt.verify(req.body.token, process.env.TOKEN_KEY);
        if(!token) return res.status(400).send('Invalid token');
        const selectedUser = await User.findOne({_id: token._id});
        if(!selectedUser)return res.status(400).send('Invalid token');

        res.send([selectedUser.name, selectedUser.admin]);
    },

    listUser: async (req, res) => {
        //data validate
        const {error} = userValidate.token(req.body);
        if(error) return res.status(400).send(error.message);

        const token = jwt.verify(req.body.token, process.env.TOKEN_KEY);
        if(!token) return res.status(400).send('Invalid token');
        const selectedUser = await User.findOne({_id: token._id});
        if(!selectedUser.admin)return res.status(400).send('Access danied');

        const listUsers = await User.find();
        listUsers.shift();

        res.send(listUsers);
    }
}

module.exports = userController;