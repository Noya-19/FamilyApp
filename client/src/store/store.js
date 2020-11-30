import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        family: {},
        chores: [],
        events: [],
        mappedUserIds: []
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
            state.family.forEach(user =>
                state.mappedUserIds.push(user.id)
            )
        },
        setChores (state, chores) {
            chores.forEach(chore => {
                state.chores.push(chore)
            })
        },
        setChoreCompletion (state, payload) { // payload = {choreIndex, value}
            state.chores[payload.choreIndex].isComplete = payload.value
        },
        setEvents (state, events) {
            events.forEach(event => {
                state.events.push(event)
            })
        },
        addEvent (state, event){
            state.events.push(event)
        },
        removeEvent (state, eventIndex){
            state.events.splice(eventIndex, 1)
        },
        emptyStore (state){
            state.family= {},
            state.chores= [],
            state.events= [],
            state.mappedUserIds= []
        },
        addChore (state, chore){
            state.chores.push(chore)
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
        setChoreCompletion ({commit}, choreIndex, value) {
            commit('setChoreCompletion', choreIndex, value)
        },
        setEvents ({commit}, events) {
            commit('setEvents', events)
        },
        addEvent ({commit}, event){
            commit('addEvent', event)
        },
        removeEvent ({commit}, event){
            commit('removeEvent', event)
        },
        emptyStore ({commit}) {
            commit('emptyStore')
        },
        addChore ({commit}, chore){
            commit('addChore', chore)
        },
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
