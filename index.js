const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const path = require('path');
const newsRouter = require('./routes/newsRouter');
const userRouter = require('./routes/userRouter');

app.use('/user', express.json(), userRouter);
app.use('/news', express.json(), newsRouter);

app.use(express.static(path.join(__dirname, 'client/build/')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client/build/'), (error)=>{
        if(error) res.status(500).send(error);
    })
})

app.listen(PORT, ()=>{console.log(`Runing on port ${PORT}`)});