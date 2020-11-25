<template>
    <main class="chores">

        <div class="grid-container">

            <div class="left">
                <table id="shopping-list-table" class="table table-condensed table-hover">
                    <thead>
                        <tr>
<!--                            <th>Quantity</th>
                            <th>Item</th>
                            <th>Actions</th>-->
                        </tr>
                    </thead>
                    <tr v-for="(item, index) in choresList">
                        <td>
                            {{item.choresName}}
                        </td>
                        <td>
                           <!-- <button type="button" class="deleteButton" @click="deleteChore(index)" ></button>-->
                        </td>
                    </tr>
                </table>
                <input type="text" v-model="choresName" class="choreNameText" placeholder="enter chore" id="textbox">
            </div>
            <div class="header"><h1>Chores</h1></div>
            <div class="middle">Personal</div>
            <div class="right">Up for Grabs</div>

            <div class="footer">
                <button type="button" class="addButton" onclick="document.getElementById('textbox').value = ''"  @click="addChore"  >Add New Chore</button>

            </div>
        </div>

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
            choresName: "",
            checked: "",
            choresList: [],
        }
    },
    methods: {
        getAllFamilyChores () {
            
        },
        addChore() {
            const choresName = this.choresName;
            console.log(this.choresName);
            this.choresList.push({
                choresName: this.choresName,
                checked:false
            })
        },
        deleteChore(index) {
            choresList.splice(index, 1);
            console.log("inside deleteChore");
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

</style>
