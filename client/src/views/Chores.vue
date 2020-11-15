<template>
    <main class="chores">
        <h1>Chores</h1>
        <p>task1</p>
    </main>
</template>

<script>
export default {
    name: 'Chores',
    title: 'Chores',
<<<<<<< Updated upstream
    props: {
    
=======
    data () {
        return {
            chores: null
        }
    },
    async mounted () {
        this.chores = await ChoreService.index(this.$store.userid)
>>>>>>> Stashed changes
    }
}
</script>