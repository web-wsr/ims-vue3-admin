const Article = require('../../model/article');
const classify = require('../../model/classify');
const articleClassify = require('../../model/article_classify');
const { formatDate } = require('../../utils/date');

const articleInfoController = {
    index: async function (req, res, next) {
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
            res.locals.articleList = articleList.map(data => {
                data.created_at_display = formatDate(data.created_at)
                return data
            })
            res.render('web/index.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    technologyTrends: async function (req, res, next) {
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
            // 筛选出 classify_name 包含 "科技动态" 的对象
            const technologyTrendsArticle = articleList.filter(data => {
                return data.classify_name.includes("科技动态");
            });
            res.locals.nav = 'technologyTrends'
            res.locals.title = '技术动态'
            res.locals.technologyTrendsArticle = technologyTrendsArticle.map(data => {
                data.created_at_display = formatDate(data.created_at)
                return data
            })
            res.render('web/technologyTrends.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    lifeEssays: async function (req, res, next) {
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
            // 筛选出 classify_name 包含 "生活随笔" 的对象
            const lifeEssays = articleList.filter(data => {
                return data.classify_name.includes("生活随笔");
            });
            res.locals.nav = 'lifeEssays'
            res.locals.title = '生活随笔'
            res.locals.lifeEssays = lifeEssays.map(data => {
                data.created_at_display = formatDate(data.created_at)
                return data
            })
            res.render('web/lifeEssays.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    notification: async function (req, res, next) {
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
            // 筛选出 classify_name 包含 "通知公告" 的对象
            const notification = articleList.filter(data => {
                return data.classify_name.includes("通知公告");
            });
            res.locals.notification = notification.map(data => {
                data.created_at_display = formatDate(data.created_at)
                return data
            })
            res.locals.nav = 'notification'
            res.locals.title = '生活随笔'
            res.render('web/notification.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    technologyHot: async function (req, res, next) {
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
            // 筛选出 classify_name 包含 "科技热点" 的对象
            const technologyHot = articleList.filter(data => {
                return data.classify_name.includes("科技热点");
            });
            res.locals.technologyHot = technologyHot.map(data => {
                data.created_at_display = formatDate(data.created_at)
                return data
            })
            res.locals.nav = 'technologyHot'
            res.locals.title = '科技热点'
            res.render('web/technologyHot.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    }
}

module.exports = articleInfoController;