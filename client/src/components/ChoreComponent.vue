<template>
    <v-card
        elevation="1"
        tile
        outlined
        max-width="200"
    >
        <v-card-title class="no-wrap">
            {{title}}
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
        <v-card-actions
        >
            <v-btn v-if="!isComplete" class="completion-btn"
                small
                dark
                color='indigo darken-4'
                elevation="2"
                @click="updateChore(selfJSON(), true)"
            >
                Finish
            </v-btn>
            <v-btn v-else class="completion-btn"
                small
                dark
                color='red darken-4'
                elevation="2"
                @click="updateChore(selfJSON(), false)"
            >
                Not Done
            </v-btn>
            <v-btn class="delete-btn"
                fab
                elevation="0"
                small
                color="white"
                @click="deleteChore(selfJSON())"
            >
                <v-icon
                    dark
                    color='red darken-4'
                >
                    mdi-delete-outline
                </v-icon>
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
    .delete-btn {
        padding-right: 2rem;
    }
    .completion-btn {

    }
</style>
