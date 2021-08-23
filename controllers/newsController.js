const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/User');
const News = require('../schemas/News');
const userValidate = require('../validate/userValidate');
const newsValidate = require('../validate/newsValidate');

const userController = {

    create: async (req, res) => {
        //Data validate
        const { error } = newsValidate.create(req.body);
        if (error) return res.status(400).send(error.message);

        //Search post in database
        const selectedPost = await News.findOne({ title: req.body.title });
        if (selectedPost) return res.status(400).send("Title post already exist");

        //Prepare news data
        const post = new News({
            posterId: req.body.posterId,
            title: req.body.title,
            text: req.body.text,
            imageLink: req.body.imageLink
        })

        //send to database
        try {
            const savedNews = await post.save();
            res.send(savedNews);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    read: async (req, res) => {
        //Data validate
        const { error } = newsValidate.read(req.body);
        if (error) return res.status(400).send(error.message);

        //Verify admin and send news
        const _id = jwt.verify(req.body.readerId, process.env.TOKEN_KEY);
        const readerData = await User.findOne({ _id: _id._id });

        if (readerData.admin) {
            const news = await News.find({ title: { $regex: req.body.title } });
            if (!news) return res.status(400).send('News is empyt');
            res.send(news);
        } else {
            const news = await News.find({ posterId: req.body.readerId, title: { $regex: req.body.title } });
            if (!news) return res.status(400).send('News is empyt');
            res.send(news);
        }
    },

    update: async (req, res) => {
        //Data validate
        const { error } = newsValidate.update(req.body);
        if (error) return res.status(400).send(error.message);

        const news = await News.findOne({ _id: req.body._id });
        const user = await User.findOne({ _id: req.body.editerId });

        //News user verification
        if (!user.admin && user._id != news.posterId) return res.status(403).send('Access denied');

        const editedNews = await News.updateOne({ _id: req.body._id }, {
            $set: {
                title: req.body.title.length < 3 ? news.title : req.body.title,
                text: req.body.text.length < 10 ? news.text : req.body.text,
                imageLink: req.body.imageLink != news.imageLink ? req.body.imageLink : news.imageLink
            }
        })

        //Response to user
        if (!editedNews) return res.status(400).send('Error: News not found');
        res.send(editedNews);
    },

    delete: async (req, res) => {
        //Data validate
        const { error } = newsValidate.delete(req.body);
        if (error) return res.status(400).send(error.message);

        const news = await News.findOne({ _id: req.body._id });
        const user = await User.findOne({ _id: req.body.deleterId });

        console.log(news);
        console.log(user);

        //News user verification
        if (!user.admin && user._id != news.posterId) return res.status(403).send('Access denied');

        //News delete
        const deletedNews = await News.deleteOne({ _id: req.body._id });

        //Response to user
        if (!deletedNews) return res.status(400).send('Error: User not found');
        res.send(deletedNews);
    }
}

module.exports = userController;