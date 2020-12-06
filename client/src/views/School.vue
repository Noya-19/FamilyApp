<template>
    <v-main class="school">
      <div class="grid-container">
        <div class="header"><h1>CSUN</h1></div>

        <div class="left"> Everone's Assignments</div>
        <div class="right">School Calendar</div>
        <div class="bot-left">Linear Algebra</div>
        <div class="footer">Filter by People</div>
      </div>
    </v-main>
</template>

<script>
export default {
  name: 'School',
  title: 'School',
  props: {
  },
  mounted() {
    console.log(this.$store.state.events)
    console.log(this.$store.state.chores)
  } 
}
</script>

<style scoped lang="scss">
  @import "../scss/variables.scss";

  .grid-container {
    grid-template-columns: 17rem 17rem 17rem 17rem 17rem;/*200px 200px 200px 200px 200px 200px;*/
    grid-template-rows: 2.5rem 40rem auto;
    padding-left: $lg-gutter;
    padding-right: $lg-gutter;
    background-color: $light-gray;
    //background-color: black;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
    "header header header header header"
    "left left right right right"
    "bot-left bot-left footer footer footer";
    grid-column-gap: 4rem;
  }

  .left,
  .right,
  .bot-left {
    margin-top: 0.625rem;
    //height: 30rem;
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

  .left {
    grid-area: left;
    padding-right: 2rem;
    height: 40rem;
  }

        /* Style the middle column */
  .right {
    grid-area: right;
    height: 40rem;
  }

        /* Style the right column */
  .bot-left {
    grid-area: bot-left;
    height: 8.5rem;
    padding-right: 2rem;
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

  .footer {
    grid-area: footer;
    height: 8.5rem;
    background-color: $light-blue;
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
