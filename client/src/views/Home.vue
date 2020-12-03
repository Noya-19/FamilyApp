<template>
    <v-main class="home">
      <v-card
        elevation="4"
        outlined
      >
      <v-card-title>HouseHolder</v-card-title>
      <v-card-actions>
      <v-btn
        color="indigo darken-4"
        dark
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link to="/register">Register</router-link>
      </v-btn>
      <v-btn
        color="indigo darken-4"
        dark
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link to="/login">Login</router-link>
      </v-btn>
    </v-card-actions>
      </v-card>
    </v-main>
</template>

<script>
export default {
  name: 'Home',
  title: 'Home',
  components: {
  },

  data () {
    return {
    }
  },

  methods: {},

  mounted: function () {

  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';

</style>
