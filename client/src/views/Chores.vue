<template>
    <main class="chores">

        <div class="grid-container">

            <div class="left">
                <div id="myapp">
                    All Chores<br>

                    <!-- Select all records-->
                    <input type='button' value='select All users' @click='allRecords()'>
                    <br><br>


                    <!--Select record by ID-->
                    <input type="text" placeholder="Enter User ID" v-model="userid">
                    <input type="button" value="Select user by Family ID" @click='recordByID()'>

                    <!-- List records -->
                    <table border="1" width="100%" style="border-collapse: collapse;">
                        <tr>
                            <th>Family member</th>
                            <th>Chore</th>

                        </tr>
                    </table>
                </div>
            </div>
            <div class="header"><h1>Chores</h1></div>
            <div class="middle">Personal</div>
            <div class="right">Up for Grabs</div>

            <div class="footer">
                <p>Add New Chore</p>
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
            chores: null
        }
    },
    methods: {
        getAllFamilyChores () {
            
        }
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
        grid-template-rows: 2.5rem 50rem auto;
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
        height: 50rem;
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

        /* Style the left column */
    .left {
        grid-area: left;
    }

        /* Style the middle column */
    .middle {
        grid-area: middle;
    }

        /* Style the right column */
    .right {
        grid-area: right;
    }

        /* Style the footer */
    .footer {
        grid-area: footer;
        background-color: $light-blue;
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