<template>
  <v-app id="app" data-app app-data="true">
    <NavigationDrawer
      v-if="$store.state.isUserLoggedIn"
    />
    <v-container fluid>
      <router-view/>
    </v-container>
    <v-footer app>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer.vue'

export default {
  name: 'App',
  components: {
    NavigationDrawer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
