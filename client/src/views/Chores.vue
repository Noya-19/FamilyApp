<template>
    <v-main class="chores">
        <v-container fluid class="chores__container"
        >
            <v-col class="chores__daily-chores"
                cols="12"
            >
                <v-row
                    class="grey lighten-5"
                    style="height: 300px;"
                >
                    <v-toolbar
                        color="indigo darken-4"
                        dark
                    >
                        <v-toolbar-title>Daily Chores</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog"
                                persistent
                                max-width="400px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color='white'
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12"
                                                    max-width="300px"
                                                    min-wdith="300px">
                                                    <v-text-field label="Chore Name"
                                                        v-model="title"
                                                        color='indigo darken-4'
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12"
                                                    max-width="300px"
                                                    min-wdith="300px">
                                                    <v-select
                                                        :items="name"
                                                        label="Assign To"
                                                        v-model="assigned"
                                                        required>
                                                    </v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-menu ref="menu1"
                                                    v-model="menu1"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="dueDate"
                                                            color='indigo darken-4'
                                                            label="Date"
                                                            hint="MM/DD/YYYY format"
                                                            persistent-hint
                                                            prepend-icon="mdi-calendar"
                                                            v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="dueDate"
                                                        color='indigo darken-4'
                                                        no-title
                                                        @input="menu1 = false"></v-date-picker>
                                                </v-menu>
                                            </v-row>
                                            <v-row></v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color='indigo darken-4'
                                            text
                                            @click="dialog = false; dueDate = ''; assigned = ''; title = ''">
                                            Close
                                        </v-btn>
                                        <v-btn color='indigo darken-4'
                                            text
                                            @click="dialog = false; createChore()">
                                            Add
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    </v-toolbar>
                <v-container fluid class="chores__daily-chore-list d-flex flex-no-wrap justify-start align-stretch">
                    <!-- <ChoreComponent v-for="chore of completedChores" :key='chore.id'
                        :title="chore.title"
                        :dueDate="chore.dueDate"
                        :assignedTo="chore.assignedTo"
                        :postedBy="chore.UserId"
                        :id="chore.id"
                        :isComplete="chore.isComplete"/> -->
                </v-container>
                </v-row>
            </v-col>
            <v-col class="chores__todo"
                cols="12"
            >
                <v-row
                    class="grey lighten-5"
                    style="height: 300px;"
                >
                    <v-toolbar
                        color="indigo darken-4"
                        dark
                    >
                        <v-toolbar-title>Chores</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog"
                                persistent
                                max-width="400px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color='white'
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                    >
                                    <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12"
                                                    max-width="300px"
                                                    min-wdith="300px">
                                                    <v-text-field label="Chore Name"
                                                        v-model="title"
                                                        color='indigo darken-4'
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12"
                                                    max-width="300px"
                                                    min-wdith="300px">
                                                    <v-select
                                                        :items="name"
                                                        label="Assign To"
                                                        v-model="assigned"
                                                        required>
                                                    </v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-menu ref="menu1"
                                                    v-model="menu1"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="dueDate"
                                                            color='indigo darken-4'
                                                            label="Date"
                                                            hint="MM/DD/YYYY format"
                                                            persistent-hint
                                                            prepend-icon="mdi-calendar"
                                                            v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="dueDate"
                                                        color='indigo darken-4'
                                                        no-title
                                                        @input="menu1 = false"></v-date-picker>
                                                </v-menu>
                                            </v-row>
                                            <v-row></v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color='indigo darken-4'
                                            text
                                            @click="dialog = false; dueDate = ''; assigned = ''; title = ''">
                                            Close
                                        </v-btn>
                                        <v-btn color='indigo darken-4'
                                            text
                                            @click="dialog = false; createChore()">
                                            Add
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    </v-toolbar>
                <v-container fluid class="chores__chore-list d-flex flex-no-wrap justify-start align-stretch">
                    <ChoreComponent v-for="chore of incompletedChores" :key='chore.id'
                        :title="chore.title"
                        :dueDate="chore.dueDate"
                        :assignedTo="chore.assignedTo"
                        :postedBy="chore.UserId"
                        :id="chore.id"
                        :isComplete="chore.isComplete"/>
                </v-container>
                </v-row>
            </v-col>
            <v-col class="chores__completed"
                cols="12"
            >
                <v-row
                    class="grey lighten-5"
                    style="height: 300px;"
                >
                    <v-toolbar
                        color="indigo darken-4"
                        dark
                    >
                        <v-toolbar-title>Completed Chores</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                <v-container fluid class="chores__completed-chore-list d-flex flex-no-wrap justify-start align-stretch">
                    <ChoreComponent v-for="chore of completedChores" :key='chore.id'
                        :title="chore.title"
                        :dueDate="chore.dueDate"
                        :assignedTo="chore.assignedTo"
                        :postedBy="chore.UserId"
                        :id="chore.id"
                        :isComplete="chore.isComplete"/>
                </v-container>
                </v-row>
            </v-col>
        </v-container>
    </v-main>
</template>

<script>
import ChoreService from '@/services/ChoreService'
import ChoreComponent from '../components/ChoreComponent'
export default {
    name: 'Chores',
    title: 'Chores',
    components: {
        ChoreComponent
    },
    data () {
        return {
            menu1:'',
            dueDate:"",
            title: "",
            assigned:"",
            choreList: [],
            dialog: false,
            name:[],//need someone to help fill with names
        }
    },
    methods: {
       async createChore() {
            const dueDate = new Date(this.dueDate)
            var assignedTo
            this.assigned = this.assigned.split(" ")
            this.$store.state.family.forEach(user => {
                if(user.firstname == this.assigned[0] && user.lastname == this.assigned[1])
                    assignedTo = user.id
            })
            try {
                const response = await ChoreService.createChore({
                    title: this.title, // STRING
                    dueDate: Date.UTC(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate()+1), // DATEONLY
                    assignedTo: assignedTo, // INTEGER
                    UserId: this.$store.state.user.id, // INTEGER
                    isComplete: false, // BOOLEAN
                })
                this.$store.dispatch('addChore', {
                    id: response.data.id,
                    title: response.data.title, // STRING
                    dueDate: response.data.dueDate, // DATEONLY
                    assignedTo: response.data.assignedTo, // INTEGER
                    UserId: response.data.UserId, // INTEGER
                    isComplete: response.data.isComplete, // BOOLEAN
                })
            } catch (error) {

            }
        },
        referenceChores(){
            this.choreList = this.$store.state.chores
        },
        async getFamilyChores(family) {
            try {
            family.forEach(user => {
                    const response = ChoreService.index({
                    UserId: user.id
                })
                response.then((value)=>{
                    this.$store.dispatch('setChores', value.data)
                })
            })
            } catch (error) {
                this.error = error.response.data.error
            }
        },
    },
    computed: {
        incompletedChores: function () {
            return this.choreList.filter(function(e) {
                return !e.isComplete
            })
        },  
        completedChores: function() {
            return this.choreList.filter(function(e) {
                return e.isComplete
            })
        }
    },
    watch: {
        choreList: function () {
            this.referenceChores()
        }
    },
    mounted: async function () {
        this.$store.dispatch('emptyChores')
        await this.getFamilyChores(this.$store.state.family)
        await this.referenceChores()
        this.$store.state.family.forEach(user => {
            this.name.push(user.firstname + " " + user.lastname)
        })
    }
}
</script>

<style scoped lang="scss">
    @import "../scss/variables.scss";
</style>
