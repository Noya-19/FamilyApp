<template>
    <nav class="global-nav">
        <!--router-link to="/" -->
            <!--img alt="Famtastic logo" src="" -->
        <!--/router-link-->
        <button class="global-nav__btn" @click="toggleNavigation" :aria-expanded="isNavOpen ? 'true' : 'false'">
            <!--img src="" alt="Menu"-->
        </button>
        <ul class="global-nav__links" :class="isNavOpen ? 'global-nav__links--active' : ''">
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/dashboard">Dashboard</router-link></li>
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/calendar">Calendar</router-link></li>
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/chores">Chores</router-link></li>
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/school">School</router-link></li>
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/shopping">Shopping</router-link></li>
            <li v-if="$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/profile">Profile</router-link></li>
            <li v-if="!$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/register">Register</router-link></li>
            <li v-if="!$store.state.isUserLoggedIn" class="global-nav__element"><router-link to="/login">Login</router-link></li>
        </ul>
        <button v-if="$store.state.isUserLoggedIn" class="global-nav__logout" @click="logout">
            Log Out
        </button>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            isNavOpen: false
        }
    },

    methods: {
        toggleNavigation () {
            if (this.isNavOpen === false) {
                this.isNavOpen = true
            } else {
                this.isNavOpen = false
            }
        },
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push('/')
        }
    },

    watch: {
        '$route' () {
            this.isNavOpen = false
        }
    }
}
</script>

<style lang="scss">
@import "../scss/variables.scss";

</style>