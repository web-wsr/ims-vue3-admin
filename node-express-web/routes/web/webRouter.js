var express = require('express');
var router = express.Router();

const userInfoController = require('../../controllers/web/userInfoController');
const articleInfoController = require('../../controllers/web/articleInfoController');
const articleDetailController = require('../../controllers/web/articleDetailController')


router.get('/users/user-info', userInfoController.index);
// 前台首页
router.get('/index', articleInfoController.index);
// 分类
router.get('/technologyTrends', articleInfoController.technologyTrends);
router.get('/lifeEssays', articleInfoController.lifeEssays);
router.get('/notification', articleInfoController.notification);
router.get('/technologyHot', articleInfoController.technologyHot);
// 详情
router.get('/index/:id', articleDetailController.index);
router.get('/technologyTrends/:id', articleDetailController.technologyTrends);
router.get('/lifeEssays/:id', articleDetailController.lifeEssays);
router.get('/notification/:id', articleDetailController.notification);
router.get('/technologyHot/:id', articleDetailController.technologyHot);

module.exports = router;