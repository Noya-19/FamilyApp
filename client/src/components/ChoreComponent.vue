<template>
    <div>
        <span>{{title}}</span>
        <br>
        <span>Due: {{dueDate}}</span>
        <br>
        <span>assigned to: {{assignedToFirstName}}</span>
        <br>
        <span>posted by: {{postedByFirstName}}</span>
        <br>
    </div>

</template>

<script>
export default {
    name: 'ChoreComponent',
    props: {
        title: String,
        dueDate: String,
        assignedTo: Number,
        postedBy: Number,
    },
    data() {
        return {
            assignedToFirstName:'',
            postedByFirstName: '',
        }
    },
    methods: {
        getNameByUserId(userid) {
            return this.$store.state.family[this.$store.state.mappedUserIds.indexOf(userid)].firstname;
        }
    },
    mounted: function() {
        this.assignedToFirstName = this.getNameByUserId(this.assignedTo);
        this.postedByFirstName = this.getNameByUserId(this.postedBy);
    },
}
</script>

<style scoped lang="scss">

</style>
