import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from "../views/home.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: 'ホームページ',
                    permiss: '1'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    permiss: '2'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/charts.vue")
            }, {
                path: "/estimate",
                name: "estimate",
                meta: {
                    title: '見積',
                    permiss: '2'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/estimate_table.vue")
            }, {
                path: "/estimate_detail_table_new",
                name: "estimate_detail_table_new",
                meta: {
                    title: '見積新規',
                    permiss: '3'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/estimate_detail_table_new.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/permission.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    permiss: '6'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/upload.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: 'ユーザーメンテナン'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: 'ログイン'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/login.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '権限なし'
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        //権限がない場合は403になる
        next('/403');
    } else {
        next();
    }
});

export default router;