var express = require('express');
var router = express.Router();
const accountController = require('../../controllers/admin/accountController');
const classifyController = require('../../controllers/admin/classifyController');
const userController = require('../../controllers/admin/userController');
const articleController = require('../../controllers/admin/articleController')

// 登录相关路由
router.post('/login', accountController.login);
router.get('/logout', accountController.logout);

// 文章分类相关路由
// 获取文章分类
router.get('/classify', classifyController.classifyList);
// 添加分类
router.post('/classify', classifyController.classifyAdd);
router.put('/classify/:id', classifyController.classifyEdit)
router.delete('/classify/:id', classifyController.classifyDelete);

// 用户相关路由
router.get('/user', userController.userList);
router.post('/user', userController.userAdd);
router.put('/user/:id', userController.userEdit);
router.delete('/user/:id', userController.userDelete);

// 文章相关路由
router.get('/article', articleController.articleList);
// 文章详情
router.get('/article/:id', articleController.articleDetail);
// 添加文章
router.post('/article', articleController.articleAdd);
// 修改文章
router.put('/article/:id', articleController.articleEdit);
// 删除文章
router.delete('/article/:id', articleController.articleDelete);

module.exports = router;