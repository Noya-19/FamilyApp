<template>
    <main class="chores">
        <h1>Chores</h1>
        <p>task1</p>
    </main>
</template>

<script>
import ChoreService from '@/services/ChoreService'
export default {
    name: 'Chores',
    title: 'Chores',
<<<<<<< HEAD
<<<<<<< Updated upstream
    props: {
    
=======
=======
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
    data () {
        return {
            chores: null
        }
    },
    async mounted () {
<<<<<<< HEAD
        this.chores = await ChoreService.index(this.$store.userid)
>>>>>>> Stashed changes
=======
        this.chores = await ChoreService.index()
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
    }
}
</script>