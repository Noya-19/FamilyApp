<template>
    <v-main class="chores">
        <div data-app>
            <div class="grid-container">
                <div class="left">
                    <table id="chores-list-table" class="table table-condensed table-hover">
                        <thead>
                            <tr>
                                <th>Chores</th>
                            </tr>
                        </thead>
                        <tr v-for="chore of incompletedChores" :key='chore.id'>
                            <td>
                                <ChoreComponent
                                    :title="chore.title"
                                    :dueDate="chore.dueDate"
                                    :assignedTo="chore.assignedTo"
                                    :postedBy="chore.UserId"
                                    :id="chore.id"
                                    :isComplete="chore.isComplete"/>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="header"><h1>Chores</h1></div>
                <div class="middle">
                    <table id="completed-list-table" class="table table-condensed table-hover">
                        <thead>
                            <tr>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tr v-for="chore in completedChores" :key='chore.id'>
                            <td>
                                <ChoreComponent
                                    :title="chore.title"
                                    :dueDate="chore.dueDate"
                                    :assignedTo="chore.assignedTo"
                                    :postedBy="chore.UserId"
                                    :id="chore.id"
                                    :isComplete="chore.isComplete"/>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="right">Up for Grabs</div>

                <div class="footer">
                <v-row justify-content="center">
                    <v-dialog v-model="dialog"
                        persistent
                        max-width="400px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                                Add Chore
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
                                                          required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12"
<<<<<<< HEAD
                                                max-width="300px"
                                                min-wdith="300px">
                                            <v-select 
                                                :items="name"
=======
                                              max-width="300px"
                                               min-wdith="300px">
                                            <v-select
                                                :items="firstName"
>>>>>>> 1c92cfd115b2f9fbc805c5d48d672e7fa9c77520
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
                                                    label="Date"
                                                    hint="MM/DD/YYYY format"
                                                    persistent-hint
                                                    prepend-icon="mdi-calendar"
                                                    color='indigo darken-4'
                                                    v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="dueDate"
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
                </v-row>
                </div>
            </div>
        </div>
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
                //this.error = error.response.data.error
            }
        },
        referenceChores(){
            this.choreList = this.$store.state.chores
        }
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
        },
    },
    mounted () {
        this.referenceChores()
        this.$store.state.family.forEach(user => {
                this.name.push(user.firstname + " " + user.lastname)
            })
    }
}
</script>

<style scoped lang="scss">
    @import "../scss/variables.scss";
        /* The grid container */

    .grid-container {
        grid-template-columns: 17rem 17rem 17rem 17rem 17rem 17rem;/*200px 200px 200px 200px 200px 200px;*/
        grid-template-rows: 2.5rem 45rem auto;
        padding-left: $lg-gutter;
        padding-right: $lg-gutter;
        background-color: $light-gray;
        //background-color: black;
    }

    .grid-container {
        display: grid;
        grid-template-areas:
        "header header header header header header"
        "left left middle middle right right"
        "footer footer footer footer footer footer";
        grid-column-gap: 0.625rem;
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
        padding-top: 1rem;
    }

    .left {
        grid-area: left;
    }

      /* Style the middle column */
    .middle {
        grid-area: middle;
    }

    .right{
        grid-area: right;
    }

        /* Style the left column */
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
    .completeButton {
        background-color: blue;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }

    /* The popup form - hidden by default */
    .form-popup {
        display: none;
        position: fixed;
        bottom: 0;
        right: 15px;
        border: 3px solid #f1f1f1;
        z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
        max-width: 300px;
        padding: 10px;
        background-color: white;
    }

    /* Full-width input fields */
    .form-container input[type=text], .form-container input[type=password] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;
    }

    /* When the inputs get focus, do something */
    .form-container input[type=text]:focus, .form-container input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    /* Set a style for the submit/login button */
    .form-container .btn {
        background-color: #4CAF50;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
        margin-bottom: 10px;
        opacity: 0.8;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
        background-color: red;
    }

    /* Add some hover effects to buttons */
    .form-container .btn:hover, .open-button:hover {
        opacity: 1;
    }
    .row{
        justify-content:center;
    }
</style>
