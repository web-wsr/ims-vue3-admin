exports.up = function (knex) {
    return knex.schema
        // 用户表
        .createTable('user', function (table) {
            table.increments('id');
            table.string('name', 255);
            table.string('phone', 255).unique();
            table.string('password', 255);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        // 文章分类表
        .createTable('classify', function (table) {
            table.increments('id');
            table.string('classify_name', 255).unique;
            table.string('classify_slug', 255).unique;
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        // 文章表
        .createTable('article', function (table) {
            table.increments('id');
            table.string('title', 255);
            table.string('content', 255);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        // 文章-分类联表
        .createTable('article_classify', function (table) {
            table.integer('article_id', 11);
            table.integer('classify_id', 11);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTable('user')
        .dropTable('classify')
        .dropTable('article')
        .dropTable('article_classify')
};
exports.config = {
    transaction: false
}