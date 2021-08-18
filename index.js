const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const newsRouter = require('./routes/newsRouter');
const userRouter = require('./routes/userRouter');

app.use('/user', express.json(), userRouter);
app.use('/news', express.json(), newsRouter)

app.listen(PORT, ()=>{console.log(`Runing on port ${PORT}`)});