import {
    login,
    logout
} from '@/api/login'
import {
    getUserInfo
} from '@/api/mine/index'
import {
    getToken,
    getUser,
    removeToken,
    removeUser,
    setToken,
    setUser
} from '@/utils/auth'
import storage from '@/utils/storage'

const user = {
    state: {
        token: getToken(),
        user: getUser(),
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
    },

    actions: {
        // 登录
        Login({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    console.log(res)
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    commit('SET_USER', res.data)
                    // console.log('info', res.data)
                    setUser(res.data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    resolve()
                }).catch(error => {
                    reject(error)
                }).finally(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_USER', {})
                    removeToken()
                    removeUser()
                    storage.clean()
                })
            })
        }
    }
}

export default user
