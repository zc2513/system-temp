import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 20000) {
            Message({
                message: res.Msg || '请求出错',
                type: 'error',
                duration: 5 * 1000
            })

            // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //     MessageBox.confirm('您已经登出，您可以取消停留在这个页面，或再次登录', '确认登出', {
            //         confirmButtonText: '重新登录',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('user/resetToken').then(() => {
            //             location.reload()
            //         })
            //     })
            // }
            return Promise.reject(new Error(res.Msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.Msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
