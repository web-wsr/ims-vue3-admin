const schema = require('async-validator').default;
const Article = require('../../model/article');
const classify = require('../../model/classify');
const articleClassify = require('../../model/article_classify');

const articleController = {
    articleList: async function (req, res) {
        const page = req.query.page || 1;
        const size = req.query.pageSize || 10;

        const skip = (page - 1) * size;
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
            // 创建文章id到分类数据的映射表
            // const articleToClassifyMap = {}
            // articles.forEach(article => {
            //     articleToClassifyMap[article.id] = article.classify_name
            // })
            // console.log(articleToClassifyMap);

            // 进行数组合并
            let articleAll = await Article.all();
            let articleList = []
            articleAll.forEach(article => {

                const articlesFilterd = articles.find(data => data.id === article.id)
                console.log('articlesFilterd', articlesFilterd);

                if (articlesFilterd) {
                    const newItem = {
                        ...article,
                        articleClassiyIds: articlesFilterd.articleClassiyIds,
                        classify_name: articlesFilterd.classify_name
                    };
                    articleList.push(newItem)
                }

            })
            console.log('new', articleList);
            const author_id = res.locals.userInfo.id
            const author_name = res.locals.userInfo.name
            articleList.map(article => {
                article.author_id = author_id
                article.author_name = author_name
                return {
                    ...article,
                }
            })
            // 查询分页后的文章列表
            const articleIndex = articleList.slice(skip, skip + size)
            const total = articleList.length
            res.json({
                code: 200,
                data: articleIndex,
                articleListAll: articleList,
                total
            })
        } catch (error) {
            res.json({
                code: 500,
                message: error.message
            })
        }


    },
    articleDetail: async function (req, res) {
        try {
            const articleId = req.params.id;
            const article = await Article.where({ id: articleId });
            const classify = await articleClassify.where({ article_id: articleId })
            const classifyIds = classify.map(data => data.classify_id)
            res.json({
                code: 200,
                data: article[0],
                classifyIds
            })
        } catch (error) {
            res.json({
                code: 500,
                message: error.message
            })
        }
    },
    articleAdd: async function (req, res) {
        const { title, state, content, classify_id } = req.body;
        console.log(title, content, classify_id);
        // 验证请求参数
        const validator = new schema({
            title: { type: 'string', required: true },
            state: { type: 'string', required: true },
            content: { type: 'string', required: true },
            classify_id: { type: 'array', required: true }
        });
        try {
            await validator.validate({
                title,
                state,
                content,
                classify_id
            });
            const newArticle = await Article.insert({
                title,
                state,
                content
            });
            const articleId = newArticle.map(data => data);
            // 设置数据表article_calssify 中的数据，绑定文章 ID 和其关联的分类
            await articleClassify.insert(classify_id.map(id => {
                return {
                    article_id: articleId,
                    classify_id: id
                };
            }));
            res.json({
                code: 200,
                message: '发布文章成功'
            });
        } catch (error) {
            res.json({
                code: 500,
                message: error.message
            })
        }
    },
    articleEdit: async function (req, res) {
        const articleId = req.params.id;
        const { title, state, content, classify_id } = req.body;
        console.log(articleId, title, state, content, classify_id);

        const validator = new schema({
            title: { type: 'string', required: true },
            state: { type: 'string', required: true },
            content: { type: 'string', required: true },
            classify_id: { type: 'array', required: true }
        })
        try {
            await validator.validate({
                title,
                state,
                content,
                classify_id
            })
            // 更新文章信息
            await Article.update(articleId, {
                title,
                state,
                content
            })
            // 获取当前分类Id
            const originClassifyIds = (await articleClassify.where({ article_id: articleId })).map(data => data.classify_id);
            console.log(originClassifyIds);

            // 计算需要添加和删除的分类id
            const ClassifyToAdd = classify_id.filter(id => !originClassifyIds.includes(id));
            const ClassifyToDelete = originClassifyIds.filter(id => !classify_id.includes(id));

            // 删除不再需要的分类关联
            if (ClassifyToDelete.length > 0) {
                await articleClassify.where({ article_id: articleId }).whereIn('classify_id', ClassifyToDelete).del();
            }
            // 添加新的分类关联
            await articleClassify.insert(ClassifyToAdd.map(id => {
                return {
                    article_id: articleId,
                    classify_id: id
                }
            }))
            res.json({
                code: 200,
                message: '修改文章成功'
            })
        } catch (error) {
            res.json({
                code: 500,
                message: error.message
            })
        }
    },
    articleDelete: async function (req, res) {
        const articleId = req.params.id;
        try {
            await Article.delete(articleId);
            await articleClassify.where({ article_id: articleId }).del();
            res.json({
                code: 200,
                message: '删除文章成功'

            })
        } catch (error) {
            res.json({
                code: 500,
                message: error.message
            })
        }
    }

};

module.exports = articleController;