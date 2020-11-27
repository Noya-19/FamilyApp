<template>
    <main class="chores">

        <div class="grid-container">

            <div class="left">
                <table id="chores-list-table" class="table table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>Chores</th>
                        </tr>
                    </thead>
                    <tr v-for="(item, index) of choreList">
                        <td>
                            <choreComponent :title="item.choresName" :dueDate="item.dueDate" :assignedTo="item.assignedTo" :postedBy="item.postedBy" >
                            </choreComponent>
                        </td>
                        <td>
                            <button type="button" class="completeButton" @click="completedChore(index,item)" >Completed</button>
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
                    <tr v-for="(item, index) of completedList">
                        <td>
                            {{item.choresName}}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="right">Up for Grabs</div>

            <div class="footer">
                <button type="button" class="btn" @click="openForm()">Add New Chore</button>
                <div class="form-popup" id="myForm">
                    <form action="/action_page.php" class="form-container">
                        <h1>Add New Chore</h1>
                        <input type="text" v-model="choresName" class="choreNameText" placeholder="enter chore" id="textbox">
                        <input type="date" v-model="dueDate" >

                        <button type="button" class="btn" @click="addChore">Add New Chore</button>
                        <button type="button" class="btn cancel" @click="closeForm()">Close</button>
                    </form>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
    import ChoreService from '@/services/ChoreService'
    import choreComponent from '/../components/ChoreComponent'
export default {
    name: 'Chores',
    title: 'Chores',
    components:{
        choreComponent
    },
    data () {
        return {
            choresName: "",
            dueDate: "",
            assignedTo:'',
            postedBy:"",
            choresList: [],
            completedList: [],
            firstName:[],
        }
    },

    methods: {
        getAllFamilyChores () {

        },
        clearTextField() {
            this.choresName = "";
            this.dueDate = "";
        },
        addChore() {
            if (this.choresName == "") {
                alert("Chore cannot be left blank");//alert notification if chores left blank
                return;
            }
            this.choresList.push({
                choresName: this.choresName,
                dueDate: this.dueDate
            });
            clearTextField();
        },

        completedChore(index,item) {
            console.log("inside completedChore");
            this.choresList.splice(index, 1);
            this.completedList.push({
                choresName: item.choresName,
            });

        },

        openForm() {
            document.getElementById("myForm").style.display = "block";
        },

        closeForm() {
            document.getElementById("myForm").style.display = "none";
        },

    },


    async mounted () {
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
</style>
