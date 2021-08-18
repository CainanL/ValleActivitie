const express = require('express');
const newsController = require('../controllers/newsController');
const router = express.Router();

router.post('/create-news', newsController.createNews);
router.post('/read-news', newsController.readNews);
router.post('/update-news', newsController.updateNews);
router.delete('/delete-news', newsController.deleteNews);

module.exports = router;