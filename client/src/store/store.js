import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
  })

export default new Vuex.Store({
    strict: true,
    plugins: [vuexLocal.plugin],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        family: [],
        chores: [],
        events: []
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        },
        setFamily (state, family) {
            state.family = family
        },
        setChores (state, chores) {
            state.chores = chores
        },
        setEvents (state, events) {
            state.events = events
        }
    },
    actions: {
        // invoke actions from Vue components
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        },
        setFamily ({commit}, family) {
            commit('setFamily', family)
        },
        setChores ({commit}, chores) {
            commit('setChores', chores)
        },
        setEvents ({commit}, events) {
            commit('setEvents', events)
        }
    },
    getters: {
        getChores: state => {
            return state.chores
        },
        getEvents: state => {
            return state.events
        },
        getFamily: state => {
            return state.family
        },
    }
})