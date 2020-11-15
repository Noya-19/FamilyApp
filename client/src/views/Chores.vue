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

                        <tr v-for="user in users">
                            <td>{{user.assigned}}</td>
                            <td>{{user.choresname}}</td>


                        </tr>
                    </table>
                </div>
            </div>

            <div class="middle">Personal</div>
            <div class="right">Up for Grabs</div>

            <div class="footer">
                <p>Add New Chore</p>
            </div>
        </div>

    </main>
</template>

<script>
export default {
    name: 'Chores',
    title: 'Chores',
    props: {
    
    }
}
</script>

<style lang="scss">
        /* The grid container */
        
        .grid-container {
            grid-template-columns: 200px 200x 200px 200px 200px 200px;
            grid-template-rows: 10px 700px auto;
        }
        
        .grid-container {
            display: grid;
            grid-template-areas:
            "header header header header header header"
            "left left middle middle right right"
            "footer footer footer footer footer footer";
            grid-column-gap: 10px;
        }

        .left,
        .middle,
        .right {
            margin-top: 10px;
            height: 700px;
            padding: 10px;
            color: black;
            border: 1px solid #e7e7e7;
            border-color: black;
            border-radius: 10px;
            background-color:#F8F8F8;
            border-color: black;
            border-width: 2px;
        }

        .header{
            padding-top: 5rem;
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
            background-color: #67A4E1;
            padding: 10px;
            text-align: center;
            margin-top: 20px;
            color: black;
            border: 1px solid #e7e7e7;
            border-color: black;
            border-radius: 10px;
            border-color: black;
            border-width: 2px;
        }

      body {
        background-color: #E0E0DE;
      }
</style>