<template>
        <v-navigation-drawer app
        class="indigo darken-4 nav-drawer"
        dark
        permanent
        left
        >
        <div class="nav-drawer__container">
            <img src="../assets/logo_size.jpg">
            <!-- <v-icon class="nav-drawer__icon"
                left
                large
            >
                mdi-home-circle-outline
            </v-icon>
            <h1 class="nav-drawer__heading">HouseHolder</h1> -->
        </div>
        <v-list dense class="nav-drawer__links">
            <v-list-item-group>
                <v-list-item>
                    <v-icon
                    left
                    >
                    mdi-home
                    </v-icon>
                    <router-link class="nav-drawer__route" v-if="$store.state.isUserLoggedIn" to="/dashboard">Dashboard</router-link>
                </v-list-item>
                <v-list-item>
                    <v-icon
                    left
                    >
                    mdi-calendar
                    </v-icon>
                    <router-link class="nav-drawer__route" v-if="$store.state.isUserLoggedIn" to="/calendar">Calendar</router-link>
                </v-list-item>
                <v-list-item>
                    <v-icon
                    left
                    >
                    mdi-broom
                    </v-icon>
                    <router-link class="nav-drawer__route" v-if="$store.state.isUserLoggedIn" to="/chores">Chores</router-link>
                </v-list-item>
                <v-list-item>
                    <v-icon
                    left
                    >
                     mdi-school
                    </v-icon>
                    <router-link v-if="$store.state.isUserLoggedIn" to="/school">School</router-link>
                </v-list-item> 
                <v-list-item>
                    <v-icon
                    left
                    >
                    mdi-basket
                    </v-icon>
                    <router-link class="nav-drawer__route" v-if="$store.state.isUserLoggedIn" to="/shopping">Shopping</router-link>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <template v-slot:append>
            <div class="pa-2 nav-drawer__logout-btn">
                <v-btn v-if="$store.state.isUserLoggedIn"
                    @click="logout"
                    color='indigo lighten-3'
                    elevation="2"
                    block
                >
                    Log Out
                </v-btn>

            </div>
        </template>
        </v-navigation-drawer>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$store.dispatch('emptyStore')
            this.$router.push('/')
        }
    },
}
</script>

<style lang='scss' scoped>
@import "../scss/variables.scss";

html {background-color: black}
.dashboard{background-color: yellow}

.nav-drawer {
    &__links {
        &--active {
            background: rgba(255,255,255, .95);
        }
        a {
            color: white;
            text-decoration: none;
            text-align: center;
            font-size: 1.2rem;
        }
    }
    &__container{
        display: flex;
        justify-content: center;
        background: white;
    }
    // &__heading {
    //     text-align: center;
    //     color: white;
    //     font-size: 1.8rem;
    // }
    &__logout-btn {
        display: flex;
        justify-content: space-evenly;
        align-content: center;
    }
}
</style>
