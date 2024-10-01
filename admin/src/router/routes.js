import BasicLayout from "@/components/Layout/BasicLayout.vue";
import AccountLogin from "@/views/Common/AccountLogin.vue";
import NotFound from "@/views/Common/NotFound.vue";
import routesArticle from "./routesArticle";
import routesUser from "./routesUser";

export default [
    {
        path: '/',
        name: 'Root',
        component: BasicLayout,
        redirect: {
            name: 'Article'
        },
        children: [
            ...routesUser,
            ...routesArticle,
        ]
    },
    {
        path: '/admin/login',
        name: 'AccountLogin',
        component: AccountLogin
    },
    {
        path: '/admin/404',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/admin/404'
    },
];