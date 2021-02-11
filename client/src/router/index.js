import Vue from 'vue'
import Router from 'vue-router'
import { CHECK_AUTH } from '../store/actions.type'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      afterEnter: (to, from, next) => {
        Promise.all([this.$store.dispatch(CHECK_AUTH)]).then(
          next({ name: 'dashboard' })
        )
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "register" */ '../components/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ '../components/Login.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      // route level code-splitting
      // this generates a separate chunk (calendar.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
    },
    {
      path: '/chores',
      name: 'chores',
      // route level code-splitting
      // this generates a separate chunk (chores.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "chores" */ '../views/Chores.vue')
    },
    {
      path: '/school',
      name: 'school',
      // route level code-splitting
      // this generates a separate chunk (school.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "school" */ '../views/School.vue')
    },
    {
      path: '/shopping',
      name: 'shopping',
      // route level code-splitting
      // this generates a separate chunk (shopping.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "shopping" */ '../views/Shopping.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (profile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
