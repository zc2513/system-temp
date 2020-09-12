// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Loading } from 'element-ui'
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // 登录
    login({ commit }, userInfo) {
        // const { userName, password } = userInfo
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', 999)
            setToken(999)
            resolve()
            // login({ userName: userName.trim(), password: password }).then(response => {
            //     const { data } = response
            //     commit('SET_TOKEN', data.token)
            //     setToken(data.token)
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // 获取用户信息
    getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            const loadingInstance = Loading.service({
                lock: true,
                text: '路由加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
                loadingInstance.close()
                dispatch('permission/generateRoutes', { roles: ['admin'], asyncRoutes: [] }, { root: true })
                commit('SET_NAME', '张三')
                commit('SET_AVATAR', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599893218258&di=187230fa002576b65eab9a611120b0a3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F18%2F20170218161710_wiVcE.gif')
                resolve()
            }, 1000)
            // getInfo(state.token).then(response => {
            //     const { data } = response

            //     // 当前用户权限
            //     const { roles, asyncRoutes } = data

            //     // 异步路由请求
            //     // asyncRoutes = axios请求 异步路由获取
            //     const loadingInstance = Loading.service({
            //         lock: true,
            //         text: '路由加载中',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     })
            //     setTimeout(() => {
            //         loadingInstance.close()
            //         dispatch('permission/generateRoutes', { roles, asyncRoutes }, { root: true })
            //     }, 1000)

            //     if (!data) {
            //         return reject('Verification failed, please Login again.')
            //     }

            //     const { name, avatar } = data

            //     commit('SET_NAME', name)
            //     commit('SET_AVATAR', avatar)
            //     resolve(data)
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // 前端退出
    logout({ commit, dispatch, state }) {
        return new Promise((resolve, reject) => {
            dispatch('resetToken')
            resolve()
            // logout(state.token).then( async() => {
            //     await dispatch('resetToken')
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // 移除登录标记
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // 先删除令牌***
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

