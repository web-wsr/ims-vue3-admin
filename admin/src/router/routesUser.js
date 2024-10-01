const AccountUser = () =>
    import(/* webpackChunkName: "user" */ '@/views/User/AccountUser.vue');

export default [
    {
        path: '/admin/user',
        name: 'AccountUser',
        component: AccountUser,
        meta: {
            permission: 'article-index',
            nav: {
                icon: 'icon-user',
                title: '用户管理'
            },
            breadcrumb: {
                name: '用户管理'
            }
        }
    },
];