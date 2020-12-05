<template>
    <v-main class="home">
      <v-card
        elevation="4"
        outlined
        class="mx-auto"
        max-width="25rem"
      >
      <v-container class="home__container">
      <img class="home__img"
        src="../assets/logo_size.jpg"
      />
      <v-card-actions>
      <v-btn
        color="indigo darken-4"
        dark
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link class="home__route" to="/register">Register</router-link>
      </v-btn>
      <v-btn
        color="indigo darken-4"
        dark
        v-if="!$store.state.isUserLoggedIn"
      >
        <router-link class="home__route" to="/login">Login</router-link>
      </v-btn>
    </v-card-actions>
    </v-container>
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
.home {
  &__container{
    display: flex;
  }
  a {
    color: white;
    text-decoration: none;
  }
}
</style>
