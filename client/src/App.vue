<template>
  <div id="app">
    <GlobalNav/>
    <router-view/>
  </div>
</template>

<script>
import GlobalNav from '@/components/GlobalNav.vue'

export default {
  name: 'App',
  components: {
    GlobalNav
  },

  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
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
