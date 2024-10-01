const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class Article extends Base {
    constructor(props = 'article') {
        super(props);
    }
}

module.exports = new Article();