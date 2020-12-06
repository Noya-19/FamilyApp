<template>
    <nav class="global-nav">
        <!--router-link to="/" -->
            <!--img alt="Famtastic logo" src="" -->
        <!--/router-link-->

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
        <v-btn v-if="$store.state.isUserLoggedIn" class="global-nav__logout" 
            @click="logout"
            rounded
            dark
            color='indigo darken-4'
            elevation="2"
        >
            Log Out
        </v-btn>
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
            this.$store.dispatch('emptyStore')
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
    .global-nav{
        width: 100%;
        background: white;
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.75rem;
        box-sizing: border-box;        
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        border: 2px solid black;
        vertical-align: top;
        background-color: #1B5289;
    }

    li {
        float: left;
        justify-content: space-evenly;         
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 0.625rem 5rem;
        text-decoration: none!important;
    }

    li a:hover:not(.active) {
        background-color: #67A4E1;
    }

    li a.active {
       color: white;
        background-color: #E1EDF9;
    }

@media screen and (min-width: map-get($break-point , "lg")) {
    .global-nav{
        box-shadow: 0px 3px 6px rgba(0,0,0,.07);
        position: fixed;
        z-index: 100;
        top: 0;
        line-height: 0;
        &__links{
            width: 45rem;
            align-items: center;
            position: relative;
            height: unset;
            opacity: 1;
            flex-direction: row;
            width: 100%;
            max-width: 55rem;
            justify-content: space-around;
            &--active{
                background: none;
                height: unset;
                width: unset;
                justify-content: start;
                box-sizing: border-box;
                opacity: 1;
            }
        }
    }
}

</style>
