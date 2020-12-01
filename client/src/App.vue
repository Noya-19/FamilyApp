<template>
  <v-app id="app" data-app app-data="true">
    <GlobalNav/>
    <router-view/>
  </v-app>
</template>

<script>
import GlobalNav from '@/components/GlobalNav.vue'

export default {
  name: 'App',
  components: {
    GlobalNav
  },
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
