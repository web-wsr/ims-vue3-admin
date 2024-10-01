const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class articleClassify extends Base {
    constructor(props = 'article_classify') {
        super(props);
    }
}

module.exports = new articleClassify();