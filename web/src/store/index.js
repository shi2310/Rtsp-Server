/* vuex用于组件之间数据共享，独立的数据不建议使用 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        setLogin(state, data) {
            localStorage.setItem('Authorization', data.Token)
            localStorage.setItem('UserInfo', JSON.stringify(data.UserInfo))
        }
    },
    getters: {},
    actions: {
        login({
            commit
        }, obj) {
            return new Promise((resolve, reject) => {
                axios.post('/login', obj).then(response => {
                    console.log(response.data)
                    const {
                        Success,
                        Msg,
                        Data
                    } = response.data
                    if (Success) {
                        commit('setLogin', Data)
                    }
                    resolve({
                        Success,
                        Msg
                    })
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})