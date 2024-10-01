exports.seed = function (knex) {
    return Promise.all([
        knex('user').insert([
            { id: 1, name: '程序员', phone: '13500000001', password: '1234567' }
        ]),

        knex('classify').insert([
            { id: 1, classify_name: '科技动态', classify_slug: 'techenology' },
            { id: 2, classify_name: '生活随笔', classify_slug: 'life' },
        ]),

        knex('article').insert([
            { id: 1, title: 'Android', content: '文章内容1' },
            { id: 2, title: '生活小提示', content: '文章内容2' },
        ]),

        knex('article_classify').insert([
            { article_id: 1, classify_id: 1 },
            { article_id: 2, classify_id: 2 },
        ])
    ])
}