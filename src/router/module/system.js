/**
 * @description 系统管理
 */

import Layout from '@/layout'

const system = {
    path: '/system',
    component: Layout,
    redirect: '/system/account',
    meta: { title: '系统管理', icon: 'dashboard' },
    children: [
        {
            path: 'company',
            name: 'Company',
            component: () => import('@/views/system/company/index'),
            meta: { title: '机构管理', icon: 'dashboard' }
        },
        {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/system/role/index'),
            meta: { title: '角色管理', icon: 'dashboard' }
        },
        {
            path: 'pageRoute',
            name: 'PageRoute',
            component: () => import('@/views/system/pageRoute/index'),
            meta: { title: '路由管理', icon: 'dashboard' }
        }
    ]
}

export default system