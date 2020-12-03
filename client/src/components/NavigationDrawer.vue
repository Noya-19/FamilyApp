<template>
    <v-navigation-drawer app
      class="indigo darken-4"
      dark
      permanent
      left
    >
    <v-list dense>
        <v-list-item-group>
            <v-list-item>
                <v-icon
                left
                >
                mdi-home
                </v-icon>
                <router-link v-if="$store.state.isUserLoggedIn" to="/dashboard">Dashboard</router-link>
            </v-list-item>
            <v-list-item>
                <v-icon
                left
                >
                mdi-calendar
                </v-icon>
                <router-link v-if="$store.state.isUserLoggedIn" to="/calendar">Calendar</router-link>
            </v-list-item>
            <v-list-item>
                <v-icon
                left
                >
                mdi-broom
                </v-icon>
                <router-link v-if="$store.state.isUserLoggedIn" to="/chores">Chores</router-link>
            </v-list-item>
            <!-- <v-list-item>
                <router-link v-if="$store.state.isUserLoggedIn" to="/school">School</router-link>
            </v-list-item> -->
            <v-list-item>
                <v-icon
                left
                >
                mdi-baguette
                </v-icon>
                <router-link v-if="$store.state.isUserLoggedIn" to="/shopping">Shopping</router-link>
            </v-list-item>
        </v-list-item-group>
    </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="$store.state.isUserLoggedIn"
            @click="logout"
            dark
            color='indigo accent-1'
            elevation="2"
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
</style>
