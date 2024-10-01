const User = require('../../model/user');
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const accountController = {
    login: async function (req, res) {
        const { phone, password } = req.body;
        try {
            const users = await User.where({ phone, password });
            const user = users[0];
            if (users.length > 0) {
                // 登录成功，返回token
                const token = JWT.sign({
                    user_id: user.id,
                    user_phone: user.phone,
                    user_name: user.name
                }, JWT_SECRET, {
                    expiresIn: '30d'
                });
                res.json({
                    code: 200,
                    message: `欢迎你，${user.name}`,
                    token
                })
            } else {
                res.json({
                    code: 400,
                    message: '账号或密码错误'
                })
            }
        } catch (e) {
            res.json({
                error_code: 0,
                message: e.message
            })
        }
    },
    logout: async function (req, res) {
        res.json({
            code: 200,
            message: '退出成功'
        })
    }
}

module.exports = accountController;