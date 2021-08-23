const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const path = require('path');
const mongoose = require('mongoose');
const newsRouter = require('./routes/newsRouter');
const userRouter = require('./routes/userRouter');

//Database
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    error => {
        error ? console.log("deu ruim", error) : console.log('Mongoose Runing');
    }
)

//Rotes
app.use('/user', express.json(), userRouter);
app.use('/news', express.json(), newsRouter);

//Front server
app.use(express.static(path.join(__dirname, 'client/build/')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/build/'), (error)=>{
        if(error) res.status(500).send(error);
    })
})

app.listen(PORT, ()=>{console.log(`Runing on port ${PORT}`)});