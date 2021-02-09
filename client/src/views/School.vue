<template>
    <v-main class="school">
      <div class="grid-container">
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
        <div class="bot-left">
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
              <h2>Linear Algebra</h2>
              <v-spacer></v-spacer>
              </v-toolbar>   

              <v-container class="home__container">
              <v-card-actions></v-card-actions>
              </v-container>
              </v-card>
        </div>
        <div class="footer">
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
              <h2>Filter by People</h2>
              <v-spacer></v-spacer>
              </v-toolbar>   

              <v-container class="home__container">
              <v-card-actions></v-card-actions>
              </v-container>
              </v-card>
        </div>
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
export default {
  name: 'School',
  title: 'School',
  components: {
     CalendarView,
     CalendarViewHeader,
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
      assignments: [],// list view of assignments in left box
      schoolItems:[],//items for school calendar
      showDate: new Date(),
      selectionStart: null,
      selectionEnd: null,
      theme: "gcal",
      startDay: "",
      endDay: "",
      title: "",
      displayVariable: "month",

    }
  },
  computed: {
      themeOptions() {
        return this.theme == "gcal"
            ? {
                top: "2.6em",
                height: "2.1em",
                border: "0px",
                previousYearLabel: "\uE5CB\uE5CB",
                previousPeriodLabel: "\uE5CB",
                nextPeriodLabel: "\uE5CC",
                nextYearLabel: "\uE5CC\uE5CC",
                currentPeriodLabel: "Today",
              }
            : {
                top: "1.4em",
                height: "1.4em",
                border: "2px",
                previousYearLabel: "<<",
                previousPeriodLabel: "<",
                nextPeriodLabel: ">",
                nextYearLabel: ">>",
                currentPeriodLabel: "",
              }
      }
    },
  methods:{
    selectEvent(event) {
      this.selectedEvent = event
    },
    setShowDate(d) {
			this.showDate = d
		},
		setSelection(dateRange) {
			this.selectionEnd = dateRange[1]
			this.selectionStart = dateRange[0]
		},
		finishSelection(dateRange) {
			this.setSelection(dateRange)
		},
		getRandomEvent(index){
			const startDay = Math.floor(Math.random() * 28 + 1)
			const endDay = Math.floor(Math.random() * 4) + startDay
			var d = new Date()
			var i = {
				id: index.toString(),
				title: "Event " + (index + 1),
				startDate: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), startDay)),
				endDate: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), endDay)),
				classes: Math.random() > 0.9 ? ["custom-date-class-red"] : null,
			}
			return i
		},
  },
  mounted() {
  } 
}
</script>

<style scoped lang="scss">
  @import "../scss/variables.scss";

  .grid-container {
        grid-template-columns: 25% 25% 25% 25%; //200px 200px 200px 200px 200px 200px;
        grid-template-rows: 25rem auto;
        padding-right: $lg-gutter;
        //background-color: $light-gray;
        //background-color: black;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
    "left left right right right"
    "bot-left bot-left footer footer footer";
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    text-align: center;
  }

  .left,
  .right,
  .bot-left {
    margin-top: 0.625rem;
    //height: 50rem;
    padding: 0.625rem;
  }

  .left {
    grid-area: left;
  }

        /* Style the middle column */
  .right {
    grid-area: right;
  }

        /* Style the right column */
  .bot-left {
    grid-area: bot-left;
  }

  .footer {
    grid-area: footer;
  }

</style>
