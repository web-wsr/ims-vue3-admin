const ArticleIndex = () =>
    import(/* webpackChunkName: "article" */ '@/views/Article/ArticleIndex.vue');
const ArticleClassify = () =>
    import(/* webpackChunkName: "article" */ '@/views/Article/ArticleClassify.vue');
const ArticleCreate = () =>
    import(/* webpackChunkName: "article" */ '@/views/Article/ArticleCreate.vue');
const ArticleEdit = () =>
    import(/* webpackChunkName: "article" */ '@/views/Article/ArticleEdit.vue');

export default [
    {
        path: 'admin/article',
        name: 'Article',
        redirect: { name: 'ArticleIndex' },
        meta: {
            permission: 'article-manage',
            nav: {
                icon: 'icon-file',
                title: '文章管理'
            },
            breadcrumb: {
                name: '文章'
            }
        },
        children: [
            {
                path: '',
                name: 'ArticleIndex',
                component: ArticleIndex,
                meta: {
                    permission: 'article-index',
                    nav: {
                        title: '文章列表'
                    },
                    breadcrumb: {
                        name: '文章列表'
                    }
                }
            },
            {
                path: 'create',
                name: 'ArticleCreate',
                component: ArticleCreate,
                meta: {
                    permission: 'article-create',
                    nav: {
                        title: '发布文章'
                    },
                    breadcrumb: {
                        name: '发布文章'
                    }
                }
            },
            {
                path: ':id',
                name: 'ArticleEdit',
                component: ArticleEdit,
            },
        ]
    },
    {
        path: 'admin/classify',
        name: 'ArticleClassify',
        component: ArticleClassify,
        meta: {
            permission: 'article-classify',
            nav: {
                icon: 'icon-goods',
                title: '文章分类'
            },
            breadcrumb: {
                name: '文章分类'
            }
        }
    }
];
