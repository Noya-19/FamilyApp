<template>
    <v-main class="dashboard">
        <div class="grid-container">
        <div class="header"><h1>FAMTASTIC</h1></div>
        <div class="left"> Shopping List</div>
        <div class="right">Calendar</div>
        <div class="bot-left">People</div>
        <div class="footer">Chore List</div>
      </div>
    </v-main>
</template>

<script>

export default {
  name: 'Dashboard',
  title: 'Dashboard',
  components: {
  },

  data () {
      return {

    }
  },
  methods: {

  },

}
</script>

<style lang="scss">
@import '../scss/variables.scss';

.grid-container {
    grid-template-columns: 25.5rem 25.5rem 25.5rem 25.5rem;/*200px 200px 200px 200px 200px 200px;*/
    grid-template-rows: 2.5rem 25rem auto;
    padding-left: $lg-gutter;
    padding-right: $lg-gutter;
    background-color: $light-gray;
    //background-color: black;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
    "header header header header"
    "left left right right"
    "bot-left footer right right";
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    text-align:center;
  }

  .left,
  .right,
  .bot-left,
  .footer {
    margin-top: 0.625rem;
    //height: 50rem;
    padding: 0.625rem;
    color: black;
    border: 0.0625rem solid $border-white;
    border-color: black;
    border-radius: 0.625rem;
    background-color:#F8F8F8;
    border-color: black;
    border-width: 0.125rem;
  }

  .header{
    padding-top: 1rem;
  }

      /* Style the left column */
  .left {
    grid-area: left;
    height: 25rem;
  }

      /* Style the middle column */
  .right {
    grid-area: right;
    height: 51rem;
  }

      /* Style the bot-left column */
  .bot-left {
    grid-area: bot-left;
    height: 23.5rem;
    padding: 0.625rem;
    text-align: center;
    margin-top: 1.25rem;
    color: black;
    border: 0.0625rem solid $border-white;
    border-color: black;
    border-radius: 0.625rem;
    border-color: black;
    border-width: 0.125rem;
  }

      /* Style the footer */
  .footer {
    grid-area: footer;
    height: 23.5rem;
    //background-color: #67A4E1;
    padding: 0.625rem;
    text-align: center;
    margin-top: 1.25rem;
    color: black;
    border: 0.0625rem solid $border-white;
    border-color: black;
    border-radius: 0.625rem;
    border-color: black;
    border-width: 0.125rem;
  }

</style>
