<template>
    <nav class="global-nav">
        <router-link to="/" >
            <!--img alt="Famtastic logo" src="" -->
            <p>Home</p>
        </router-link>
        <button class="global-nav__btn" @click="toggleNavigation" :aria-expanded="isNavOpen ? 'true' : 'false'">
            <!--img src="" alt="Menu"-->
        </button>
        <ul class="" :class="isNavOpen ? 'global-nav__links--active' : ''">
            <li class="global-nav__element"><router-link to="/register">Register</router-link></li>
            <li class="global-nav__element"><router-link to="/">Home</router-link></li>
            <li class="global-nav__element"><router-link to="/calendar">Calendar</router-link></li>
            <li class="global-nav__element"><router-link to="/chores">Chores</router-link></li>
            <li class="global-nav__element"><router-link to="/school">School</router-link></li>
            <li class="global-nav__element"><router-link to="/shopping">Shopping</router-link></li>
            <li class="global-nav__element"><router-link to="/profile">Profile</router-link></li>
        </ul>
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