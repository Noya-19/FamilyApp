<template>
    <main class="home">
      <h1>HouseHolder</h1>
      <b1> Welcome to HouseHolder! HouseHolder is a one stop app for family and personal organization! Please log in or register an account to get started.</b1>
    </main>
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

  .home{
    background-color: $light-gray;
  }
  h1{
    text-align: center;
    background-color: $slate-gray;
    background-position: center;
    width: 37.5rem;
    border: 0.9375rem solid $light-blue;
    padding: 3.125rem;
    margin: 1.25rem;
    border-radius: 0.625rem;
  }

  b1{
    text-align: center;
  }

</style>
