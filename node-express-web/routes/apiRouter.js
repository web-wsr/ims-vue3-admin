var express = require('express');
var router = express.Router();

const qiniuController = require('../controllers/api/qiniuController');

router.get('/qiniu-uploadToken', qiniuController.uploadToken);

module.exports = router;