<template>
    <main class="profile">
      <div class="grid-container">
        <div class="header"><h1>It's Me</h1></div>
        <div class="left">Navigation Bar</div>  
        <div class="right">Family</div>
        <div class="footer">Add Members</div>
      </div>
    </main>
</template>

<script>
export default {
  name: 'Profile',
  title: 'Profile',
  props: {
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';

  .grid-container {
    grid-template-columns: 24.5rem 24.5rem 24.5rem 24.5rem;
    grid-template-rows: 1rem 45rem auto;
    padding-left: $lg-gutter;
    padding-right: $lg-gutter;
    background-color: $light-gray;

  }
      
  .grid-container {
    display: grid;
    grid-template-areas:
    "header header header header"
    "left right right right"
    "footer footer footer footer";
    grid-column-gap: 2rem;
  }

  .left,
  .middle,
  .right {
    margin-top: 0.625rem;
    height: 45rem;
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
    padding-top: 1rem;;
  }

      /* Style the left column */
  .left {
    grid-area: left;
  }

      /* Style the middle column */
  .middle {
    grid-area: middle;
  }

      /* Style the right column */
  .right {
    grid-area: right;
  }

      /* Style the footer */
  .footer {
    grid-area: footer;
    background-color: $light-blue;
    height: 3rem;
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