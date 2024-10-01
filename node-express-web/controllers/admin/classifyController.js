const schema = require('async-validator').default
const Classify = require('../../model/classify');
const Article = require('../../model/article');
const articleClassify = require('../../model/article_classify');
const classifyController = {
    classifyList: async function (req, res) {
        const page = req.query.page || 1;
        const size = req.query.pageSize || 10;
        const skip = (page - 1) * size;
        const channelClassify = await Classify.all();
        const total = await Classify.count();
        // 查询分页后的分类列表
        const category = await Classify.all().orderBy('id').offset(skip).limit(size); // 使用 Knex.js 分页查
        if (category.length > 0) {
            return res.json({
                code: 200,
                data: category,
                total,
                channelClassify
            });
        }
    },
    classifyAdd: async function (req, res) {
        const { classify_name, classify_slug } = req.body;
        const validator = new schema({
            classify_slug: { type: 'string', required: true },
            classify_name: { type: 'string', required: true }
        })
        await validator.validate({
            classify_slug,
            classify_name
        });
        // 用classify_slug和classify_name是否有重复
        const existName = await Classify.where({ classify_name });
        const existSlug = await Classify.where({ classify_slug });

        if (existName.length > 0 || existSlug.length > 0) {
            return res.json({
                error_code: 400,
                message: '分类已存在'
            });
        }
        await Classify.insert({
            classify_name,
            classify_slug
        });
        return res.json({
            code: 200,
            message: '添加成功',
        });
    },
    classifyEdit: async function (req, res) {
        const id = req.params.id;
        const { classify_name, classify_slug } = req.body;
        const validator = new schema({
            classify_slug: { type: 'string', required: true },
            classify_name: { type: 'string', required: true }
        })
        try {
            await validator.validate({
                classify_slug,
                classify_name
            });
            await Classify.update(id, {
                classify_name,
                classify_slug
            });
            res.json({
                code: 200,
                message: '修改成功',
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: error.message
            })

        }
    },
    classifyDelete: async function (req, res) {
        try {
            const id = req.params.id;
            await Classify.delete(id);
            await articleClassify.knex().where({ classify_id: id }).del();
            res.json({
                code: 200,
                message: '删除成功'
            })
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message
            })
        }
    }
};

module.exports = classifyController;