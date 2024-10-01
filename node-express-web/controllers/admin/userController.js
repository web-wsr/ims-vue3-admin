const schema = require('async-validator').default
const User = require('../../model/user');

const userControllers = {
    userList: async function (req, res) {
        const page = req.query.page || 1;
        const size = req.query.pageSize || 10;
        const skip = (page - 1) * size;
        const total = await User.count();
        // 查询分页后的分类列表
        const users = await User.all().orderBy('id').offset(skip).limit(size);
        if (users.length > 0) {
            return res.json({
                code: 200,
                data: users,
                total
            });
        }
    },
    userAdd: async function (req, res) {
        const { name, phone, password } = req.body;
        const validator = new schema({
            name: { type: 'string', required: true },
            phone: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const params = {
            name,
            phone,
            password
        }
        try {
            await validator.validate(params);
            // 通过 phone 查询用户
            const existingUser = await User.where({ phone: phone });
            if (existingUser && existingUser.length > 0) {
                return res.json({
                    error_code: 400,
                    message: '用户已存在'
                });
            }
            await User.insert({
                name,
                phone,
                password
            })
            res.json({
                code: 200,
                message: '添加成功',
                data: {
                    name,
                    phone,
                    password
                }
            })
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message
            })
        }
    },
    userEdit: async function (req, res) {
        const id = req.params.id;
        const { name, phone, password } = req.body;
        const validator = new schema({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true },
            phone: { type: 'string', required: true }
        })
        try {
            await validator.validate({
                name,
                password,
                phone
            });
            await User.update(id, {
                name,
                password,
                phone
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
    userDelete: async function (req, res) {
        const id = req.params.id;
        try {
            await User.delete(id);
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
}


module.exports = userControllers;

