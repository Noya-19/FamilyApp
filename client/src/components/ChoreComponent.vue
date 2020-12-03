<template>
    <v-card
        elevation="1"
        tile
    >
<<<<<<< HEAD
        <v-card-title>
            {{title}}
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="deleteChore(selfJSON())"
                >
                <v-icon dark>
                    mdi-minus
                </v-icon>
            </v-btn>
=======
        <v-card-title>{{title}}
>>>>>>> 1c92cfd115b2f9fbc805c5d48d672e7fa9c77520
        </v-card-title>
        <v-card-text v-if="!isComplete">
            <v-row>
                Due: {{dueDate}}
            </v-row>
            <v-row>
                Assigned to {{assignedToFirstName}}
            </v-row>
            <v-row>
                Posted by {{postedByFirstName}}
            </v-row>
        </v-card-text>
        <v-card-text v-else>
            <v-row>
                Complete!
            </v-row>
            <v-row>
                Completed by {{assignedToFirstName}}
            </v-row>
            <v-row>
                Posted by {{postedByFirstName}}
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="!isComplete"
                rounded
                small
                dark
                color='indigo accent-4'
                elevation="2"
                @click="updateChore(selfJSON(), true)"
            >
                Mark as Complete
            </v-btn>
            <v-btn v-else
                rounded
                small
                dark
                color='red darken-4'
                elevation="2"
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
        async deleteChore (chore) {
            const choreStoreIndex = this.$store.state.chores.indexOf(
                this.$store.state.chores.find(e => e.id === chore.id))
            try {
                const response = await ChoreService.deleteChore({
                    choreid: chore.id,
                })
                this.$store.dispatch('removeChore', choreStoreIndex)
            } catch (err) {
                // error statement
            }
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
