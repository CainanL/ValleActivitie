const express = require('express');
const newsController = require('../controllers/newsController');
const router = express.Router();

router.post('/create-news', newsController.create);
router.post('/read-news', newsController.read);
router.post('/update-news', newsController.update);
router.delete('/delete-news', newsController.delete);

module.exports = router;