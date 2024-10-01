const Article = require('../../model/article');
const classify = require('../../model/classify');
const articleClassify = require('../../model/article_classify');
const { formatDate } = require('../../utils/date');

const articleDetailController = {
    index: async function (req, res, next) {
        const articleId = req.params.id;
        try {
            // 联表获取所有文章的id和分类id
            const articleClassifies = await articleClassify.all()
            const articleIds = Array.from(new Set(articleClassifies.map(data => data.article_id)))
            const classifyIds = Array.from(new Set(articleClassifies.map(data => data.classify_id)))

            const allArticle = await Article.knex().whereIn('id', articleIds)
            const allClassify = await classify.knex().whereIn('id', classifyIds)
            // 初始化文章article 的数组对象，消除作用域
            let articles = []
            // 构建文章列表，包含每个文章的详细，以及分类名称
            articles = allArticle.map(article => {
                // 找到以当前文章关联的所有分类id
                const articleClassiyIds = articleClassifies.filter(data => data.article_id === article.id).map(item => item.classify_id)

                // 从所用分类中筛选出与当前文章关联的分类 并取出对应的分类名称
                const classifyName = allClassify.filter(data => articleClassiyIds.includes(data.id)).map(item => item.classify_name)
                return {
                    id: article.id,
                    articleClassiyIds,
                    classify_name: classifyName,
                }
            })
            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)


                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            res.locals.nav = 'all'
            res.locals.title = '首页'
            // 筛选数组articleList中id为articleId的对象
            const articleDetail = articleList.find(data => data.id == articleId)
            res.locals.articleDetail = {
                ...articleDetail,
                created_at_display: formatDate(articleDetail.created_at)
            };
            res.render('web/indexDetail.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    technologyTrends: async function (req, res, next) {
        const articleId = req.params.id;
        try {
            // 联表获取所有文章的id和分类id
            const articleClassifies = await articleClassify.all()
            const articleIds = Array.from(new Set(articleClassifies.map(data => data.article_id)))
            const classifyIds = Array.from(new Set(articleClassifies.map(data => data.classify_id)))

            const allArticle = await Article.knex().whereIn('id', articleIds)
            const allClassify = await classify.knex().whereIn('id', classifyIds)
            // 初始化文章article 的数组对象，消除作用域
            let articles = []
            // 构建文章列表，包含每个文章的详细，以及分类名称
            articles = allArticle.map(article => {
                // 找到以当前文章关联的所有分类id
                const articleClassiyIds = articleClassifies.filter(data => data.article_id === article.id).map(item => item.classify_id)

                // 从所用分类中筛选出与当前文章关联的分类 并取出对应的分类名称
                const classifyName = allClassify.filter(data => articleClassiyIds.includes(data.id)).map(item => item.classify_name)
                return {
                    id: article.id,
                    articleClassiyIds,
                    classify_name: classifyName,
                }
            })
            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)


                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            res.locals.nav = 'technologyTrends'
            res.locals.title = '文章详情'
            // 筛选数组articleList中id为articleId的对象
            const articleDetail = articleList.find(data => data.id == articleId)
            res.locals.articleDetail = {
                ...articleDetail,
                created_at_display: formatDate(articleDetail.created_at)
            };
            res.render('web/technologyTrendsDetail.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    technologyHot: async function (req, res, next) {
        const articleId = req.params.id;
        try {
            // 联表获取所有文章的id和分类id
            const articleClassifies = await articleClassify.all()
            const articleIds = Array.from(new Set(articleClassifies.map(data => data.article_id)))
            const classifyIds = Array.from(new Set(articleClassifies.map(data => data.classify_id)))

            const allArticle = await Article.knex().whereIn('id', articleIds)
            const allClassify = await classify.knex().whereIn('id', classifyIds)
            // 初始化文章article 的数组对象，消除作用域
            let articles = []
            // 构建文章列表，包含每个文章的详细，以及分类名称
            articles = allArticle.map(article => {
                // 找到以当前文章关联的所有分类id
                const articleClassiyIds = articleClassifies.filter(data => data.article_id === article.id).map(item => item.classify_id)

                // 从所用分类中筛选出与当前文章关联的分类 并取出对应的分类名称
                const classifyName = allClassify.filter(data => articleClassiyIds.includes(data.id)).map(item => item.classify_name)
                return {
                    id: article.id,
                    articleClassiyIds,
                    classify_name: classifyName,
                }
            })
            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)


                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            res.locals.nav = 'technologyHot'
            res.locals.title = '文章详情'
            // 筛选数组articleList中id为articleId的对象
            const articleDetail = articleList.find(data => data.id == articleId)
            res.locals.articleDetail = {
                ...articleDetail,
                created_at_display: formatDate(articleDetail.created_at)
            };
            res.render('web/technologyHotDetail.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    lifeEssays: async function (req, res, next) {
        const articleId = req.params.id;
        try {
            // 联表获取所有文章的id和分类id
            const articleClassifies = await articleClassify.all()
            const articleIds = Array.from(new Set(articleClassifies.map(data => data.article_id)))
            const classifyIds = Array.from(new Set(articleClassifies.map(data => data.classify_id)))

            const allArticle = await Article.knex().whereIn('id', articleIds)
            const allClassify = await classify.knex().whereIn('id', classifyIds)
            // 初始化文章article 的数组对象，消除作用域
            let articles = []
            // 构建文章列表，包含每个文章的详细，以及分类名称
            articles = allArticle.map(article => {
                // 找到以当前文章关联的所有分类id
                const articleClassiyIds = articleClassifies.filter(data => data.article_id === article.id).map(item => item.classify_id)

                // 从所用分类中筛选出与当前文章关联的分类 并取出对应的分类名称
                const classifyName = allClassify.filter(data => articleClassiyIds.includes(data.id)).map(item => item.classify_name)
                return {
                    id: article.id,
                    articleClassiyIds,
                    classify_name: classifyName,
                }
            })
            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)


                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            res.locals.nav = 'lifeEssays'
            res.locals.title = '文章详情'
            // 筛选数组articleList中id为articleId的对象
            const articleDetail = articleList.find(data => data.id == articleId)
            res.locals.articleDetail = {
                ...articleDetail,
                created_at_display: formatDate(articleDetail.created_at)
            };
            res.render('web/lifeEssaysDetail.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    notification: async function (req, res, next) {
        const articleId = req.params.id;
        try {
            // 联表获取所有文章的id和分类id
            const articleClassifies = await articleClassify.all()
            const articleIds = Array.from(new Set(articleClassifies.map(data => data.article_id)))
            const classifyIds = Array.from(new Set(articleClassifies.map(data => data.classify_id)))

            const allArticle = await Article.knex().whereIn('id', articleIds)
            const allClassify = await classify.knex().whereIn('id', classifyIds)
            // 初始化文章article 的数组对象，消除作用域
            let articles = []
            // 构建文章列表，包含每个文章的详细，以及分类名称
            articles = allArticle.map(article => {
                // 找到以当前文章关联的所有分类id
                const articleClassiyIds = articleClassifies.filter(data => data.article_id === article.id).map(item => item.classify_id)

                // 从所用分类中筛选出与当前文章关联的分类 并取出对应的分类名称
                const classifyName = allClassify.filter(data => articleClassiyIds.includes(data.id)).map(item => item.classify_name)
                return {
                    id: article.id,
                    articleClassiyIds,
                    classify_name: classifyName,
                }
            })
            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)


                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            res.locals.nav = 'notification'
            res.locals.title = '文章详情'
            // 筛选数组articleList中id为articleId的对象
            const articleDetail = articleList.find(data => data.id == articleId)
            res.locals.articleDetail = {
                ...articleDetail,
                created_at_display: formatDate(articleDetail.created_at)
            };
            res.render('web/notificationDetail.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    }
};

module.exports = articleDetailController;