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
