<template>
    <div>
        <p>
            {{title}}
            <br />
            Due: {{dueDate}}
            <br />
            assigned to: {{assignedToFirstName}}
            <br />
            posted by: {{postedBy}}
            <br />
        </p>
    </div>

</template>

<script>
export default {
    name: 'ChoreComponent',
    props: {
        title: String,
        dueDate: Date,
        assignedTo: Integer,
        postedBy: Integer,
    },
    data() {
        return {
            assignedToFirstName:'',
            postedByFirstName: '',
            assignedToInt: this.assignedTo,
            postedByInt: this.postedBy
        }
    },
    methods: {
        getNameByUserId(userid) {
            return this.$store.family[this.$store.mappedUserIds.indexOf(userid)].firstname;
        }
    },
    mounted: function() {
        this.assignedToFirstName = this.getNameByUserId(this.assignedToInt);
        this.postedByFirstName = this.getNameByUserId(this.postedByInt);
    },
}
</script>

<style scoped lang="scss">

</style>
