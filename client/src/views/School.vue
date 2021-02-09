<template>
    <v-main class="school">
      <div class="grid-container">
        <div class="header"><h1>CSUN</h1></div>
        <div class="left">
          <v-card
                elevation="4"
                outlined
                class="mx-auto"
                width="100%"
                height="100%"
          >
          <v-toolbar
                color="indigo darken-4"
                dark
          >
           <h2>Upcoming Assignemets</h2>
              <v-spacer></v-spacer>
          </v-toolbar>
          <template>
            <v-card>
              <v-card-title>
                Class
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="assignments"
                :search="search"
              ></v-data-table>
            </v-card>
          </template>   
          </v-card>  
        </div>
        <div class="right">
              <v-card
                elevation="4"
                outlined
                class="mx-auto"
                width="100%"
                height="100%"
                
              >              
              <v-toolbar
                color="indigo darken-4"
                dark
              >
              <h2>School Calendar</h2>
              <v-spacer></v-spacer>
              </v-toolbar>

                <div id="calendar" class="calView">
                      <calendar-view v-if="displayVariable ==='month'"
                                    :show-date="showDate"
                                    :enableDragDrop="true"
                                    :items="schoolItems"
                                    displayPeriodUom="month"
                                    :enable-date-selection="true"
                                    :selection-start="selectionStart"
                                    :selection-end="selectionEnd"
                                    :display-week-numbers="false"
                                    :item-top="themeOptions.top"
                                    :item-content-height="themeOptions.height"
                                    :item-border-height="themeOptions.border"
                                    :current-period-label="themeOptions.currentPeriodLabel"
                                    class="holiday-us-traditional holiday-us-official"
                                    @date-selection-start="setSelection"
                                    @date-selection="setSelection"
                                    @date-selection-finish="finishSelection"
                                    @click-item="selectEvent">
                          <calendar-view-header slot="header"
                                                slot-scope="{ headerProps }"
                                                :header-props="headerProps"
                                                :previous-year-label="themeOptions.previousYearLabel"
                                                :previous-period-label="themeOptions.previousPeriodLabel"
                                                :next-period-label="themeOptions.nextPeriodLabel"
                                                :next-year-label="themeOptions.nextYearLabel"
                                                @input="setShowDate" />
                      </calendar-view>
                </div>
              </v-card>
        </div>
        <div class="bot-left">Linear Algebra</div>
        <div class="footer">Filter by People</div>
      </div>
    </v-main>
</template>

<script>
    import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
    // The next two lines are processed by webpack. If you're using the component without webpack compilation,
    // you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
    import EventService from '@/services/EventService'
    require("vue-simple-calendar/static/css/default.css")
    require("vue-simple-calendar/static/css/holidays-us.css")
    var eventColors = ["aqua", "#67A4E1", "pink", "yellow", "green", "gray", "white", "lightgreen"]
export default {
  name: 'School',
  title: 'School',
  components: {
  },
  data(){
    return{
      search: '',
      headers: [
        {
          text: 'Assignments',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Class', value: 'class' },
        { text: 'Due Date', value: 'dueDate' },
      ],
      assignments: [
        {
          name: 'Lab 1',
          class: 'Physics',
          dueDate: '2/5/21',
        },
        {
          name: 'Senior Project',
          class: 'Comp 490',
          dueDate: '2/7/21',
        },
      ],
      schoolItems:[],//items for school calendar
      showDate: new Date(),
      selectionStart: null,
      selectionEnd: null,
       theme: "gcal",
    }
  },
  
  mounted() {
  } 
}
</script>

<style scoped lang="scss">
  @import "../scss/variables.scss";

  .grid-container {
    grid-template-columns: 17rem 17rem 17rem 17rem 17rem;/*200px 200px 200px 200px 200px 200px;*/
    grid-template-rows: 2.5rem 40rem auto;
    padding-left: $lg-gutter;
    padding-right: $lg-gutter;
    background-color: $light-gray;
    //background-color: black;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
    "header header header header header"
    "left left right right right"
    "bot-left bot-left footer footer footer";
    grid-column-gap: 4rem;
  }

  .left,
  .right,
  .bot-left {
    margin-top: 0.625rem;
    //height: 30rem;
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
    padding-right: 2rem;
    height: 40rem;
  }

        /* Style the middle column */
  .right {
    grid-area: right;
    height: 40rem;
  }

        /* Style the right column */
  .bot-left {
    grid-area: bot-left;
    height: 8.5rem;
    padding-right: 2rem;
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

  .footer {
    grid-area: footer;
    height: 8.5rem;
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
