const userInfoController = {
    index: function (req, res, next) {
        try {
            if (res.locals.isLogin) {
                const userId = res.locals.userInfo.id;
                const userName = res.locals.userInfo.name;
                res.json({
                    id: userId,
                    name: userName,
                });
            }
        } catch (error) {
            res.json({
                error_code: 0,
                message: error.message
            })
        }
    }
}

module.exports = userInfoController;