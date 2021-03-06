import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * hidden: true                   如果设置为真，项目将不会显示在侧边栏中(默认为假)
 * alwaysShow: true               是否始终显示根菜单，没有设置alwaysShow则当项目有一个以上的子路径时,它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'             缓存关键
 * meta : {
    roles: ['admin','editor']    控制页面角色
    title: 'title'               在侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            面包屑设置：(默认为true)，如果设置为false，则不再面包屑中显示
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
    noCache: true                如果设置为true，页面将不会被缓存(默认false)
    affix: true                  如果设置为true tags-view将固定标签，刷新后保存 (默认为false)
  }
 */

/**
 * 无权限的基本页面
 * path 支持http/s地址
 * constantRoutes
 * 无权限要求的配置数据，所以路由用户均可访问
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard', affix: true }
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: '案例', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: '表格', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: '树状图', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: '表单', icon: 'form' }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: { title: '嵌套路由', icon: 'nested' },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: '菜单一' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: '菜单1.1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: '菜单1.2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: '菜单1.2.1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: '菜单1.2.2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: '菜单1.3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                name: 'Menu2',
                meta: { title: '菜单二' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 重置路由
}

export default router
