<template>
    <main class="home">
      <div class="grid-container">

        <div class="top">
          <h1>HouseHolder</h1>
        </div>
        <div class="middle">
          <b1> Welcome to HouseHolder! HouseHolder is a one stop app for family and personal organization! Please log in or register an account to get started.</b1>
        </div>
        <div class="bottom">

        </div>

      </div>


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

  .grid-container {
      grid-template-columns: auto;
      grid-template-rows: auto auto auto;
      padding-left: $lg-gutter;
      padding-right: $lg-gutter;
      background-color: $light-gray;
  }

  .grid-container {
        display: grid;
        grid-template-areas:
        "top"
        "middle"
        "bottom";
        grid-column-gap: 0.625rem;
    }

  .home{
    background-color: $light-gray;
  }
  .top, .middle, .bottom{
    text-align: center;
  }
  .middle{
    height: 39.9rem;
  }
  h1{
    text-align: center;
    background-color: $slate-gray;
    background-position: center;
    //width: 37.5rem;
    border: 0.9375rem solid $light-blue;
    padding: 3.125rem;
    margin: 1.25rem;
    border-radius: 0.625rem;
  }

  b1{
    text-align: center;
  }

</style>
