<template>
    <v-card
        elevation="1"
        tile
    >
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>
            <v-row v-if="!isComplete">
                Due: {{dueDate}}
            </v-row>
            <v-row v-else>
                Due: Complete!
            </v-row>
            <v-row>
                Assigned to: {{assignedToFirstName}}
            </v-row>
            <v-row>
                Posted by: {{postedByFirstName}}
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="!isComplete"
                text
                @click="updateChore(selfJSON(), true)"
            >
                Mark as Complete
            </v-btn>
            <v-btn v-else
                text
                @click="updateChore(selfJSON(), false)"
            >
                Mark as Incomplete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import ChoreService from '@/services/ChoreService'
export default {
    name: 'ChoreComponent',
    props: {
        title: String,
        dueDate: String,
        assignedTo: Number,
        postedBy: Number,
        id: Number,
        isComplete: Boolean
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
        },
        selfJSON () {
            return {
                title: this.title,
                dueDate: this.dueDate,
                assignedTo: this.assignedTo,
                postedBy: this.postedBy,
                id: this.id,
                isComplete: this.isComplete
            }
        },
        async updateChore (chore, value) {
            const choreStoreIndex = this.$store.state.chores.indexOf(
                this.$store.state.chores.find(e => e.id === chore.id))
            try {
                const response = await ChoreService.updateChore({
                    id: chore.id,
                    isComplete: value
                })
                this.$store.dispatch('setChoreCompletion', {
                    choreIndex: choreStoreIndex, 
                    value: response.data.isComplete
                });
            } catch (err) {
                // error statement
            }
        },
    },
    mounted: function() {
        this.assignedToFirstName = this.getNameByUserId(this.assignedTo);
        this.postedByFirstName = this.getNameByUserId(this.postedBy);
    },
}
</script>

<style scoped lang="scss">

</style>
