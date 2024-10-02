const config = require('../../config.js');
const qiniu = require('qiniu');

const qiniuController = {
    uploadToken: async function (req, res, next) {
        try {
            const accessKey = config.qiniu.accessKey;
            const secretKey = config.qiniu.secretKey;
            const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            const options = {
                scope: 'itwsr', // 空间名称
            };
            const putPolicy = new qiniu.rs.PutPolicy(options);
            const uploadToken = putPolicy.uploadToken(mac);
            res.json({
                token: uploadToken,
                domain: 'http://skok9cew8.hn-bkt.clouddn.com',
            });
        } catch (e) {
            console.log(e);
            res.json({ code: 0, message: 'server error' })
        }
    },
}

module.exports = qiniuController;