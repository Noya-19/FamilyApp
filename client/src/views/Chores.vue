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
    props: {
    },
    data () {
        return {
            chores: null
        }
    },
    methods: {
        getAllFamilyChores () {
            
        }
    },
    async mounted () {
        this.chores = await ChoreService.index(this.$store.userid)
    }
}
</script>