<template>
    <v-main class="school">
      <div class="grid-container">
       
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
              <v-toolbar-title>School Calendar</v-toolbar-title>
              <v-spacer></v-spacer>
              </v-toolbar>

                <div id="calendar" class="calView">
                    <calendar-view v-if="displayVariable ==='month'"
                                  :show-date="showDate"
                                  :enableDragDrop="true"
                                  :items="assignments"
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
           <v-toolbar-title>Upcoming Assignemets</v-toolbar-title>
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
        <div class="bot-right">
          <v-card elevation="4"
                      outlined
                      class="mx-auto"
                      width="100%"
                      height="100%">

                <v-toolbar color="indigo darken-4"
                           dark>
                  <v-toolbar-title>People</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-simple-table :height="heightOfCalTable">
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="(item, index) in people" :key="index">
                        <td>
                          <v-icon
                          >mdi-account-box
                          </v-icon>
                          {{ item }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
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
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Class', value: 'class' },
        {text: 'Assignment', value:'title'},
        { text: 'Due Date', value: 'endDate1' },
      ],
      assignments: [
        {
          name: "Kyle",
          class: "Comp 440",
          title: "Data Management Application",
          startDate: new Date(Date.UTC(2021,3 , 19)),
				  endDate: new Date(Date.UTC(2021, 3, 19)), 
           endDate1: "4/19/2021",
          id: 1,
        },
        {
          name: "Renaldy",
          class: "Comp 429",
          title: "Quiz 2",
          startDate: new Date(Date.UTC(2021,3 , 22)),
				  endDate: new Date(Date.UTC(2021, 3, 22)), 
          endDate1: "4/22/2021",
           id: 2,
        },
        {
          name: "Christian",
          class: "Comp 565",
          title: "OpenGL assignment 1",
          startDate: new Date(Date.UTC(2021,3 , 29)),
				  endDate: new Date(Date.UTC(2021, 3, 29)), 
          endDate1: "4/29/2021",
          id: 3,
        },
        {
          name: "Josh",
          class: "Comp 482",
          title: "Quiz 5",
         startDate: new Date(Date.UTC(2021,3 , 13)),
				  endDate: new Date(Date.UTC(2021, 3, 13)),
           endDate1: "4/13/2021", 
          id: 4,
        },
        {
          name: "Renaldy",
          class: "Comp 565",
          title: "Group project prsentation",
         startDate: new Date(Date.UTC(2021,3 , 9)),
				  endDate: new Date(Date.UTC(2021, 3, 9)),
           endDate1: "4/9/2021", 
          id: 5,
        },
        {
          name: "Josh",
          class: "Comp 482",
          title: "Project 4",
         startDate: new Date(Date.UTC(2021,3 , 15)),
				  endDate: new Date(Date.UTC(2021, 3, 15)),
           endDate1: "4/15/2021", 
          id: 6,
        },
        {
          name: "Kyle",
          class: "Comp 440",
          title: "Project proposal",
         startDate: new Date(Date.UTC(2021,3 , 17)),
				  endDate: new Date(Date.UTC(2021, 3, 17)),
           endDate1: "4/17/2021", 
          id: 7,
        }
      ],// list view of assignments in left box
      name: "",
      people:[],
      showDate: new Date(),
      selectionStart: null,
      selectionEnd: null,
      theme: "gcal",
      startDay: "",
      endDay: "",
      title: "",
      displayVariable: "month",
      heightOfCalTable: '300px',


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
      console.log(i);
			return i
		},
     fillPeople() {
              this.$store.state.family.forEach(user => {
                this.people.push(user.firstname + " " + user.lastname)
              })
            },
  },
  async mounted() {
     await this.fillPeople()
  } 
}
</script>

<style scoped lang="scss">
  @import "../scss/variables.scss";

  .grid-container {
        grid-template-columns: 25% 25% 25% 25%;
        grid-template-rows: 33.5rem auto;
        padding-right: $lg-gutter;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
    "right right right right right"
    "bot-left bot-left bot-right bot-right bot-right";
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    text-align: center;
  }


  .left,.right,
  .bot-left, .bot-right {
    margin-top: 0.625rem;
    padding: 0.625rem;
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }

  .bot-left {
    grid-area: bot-left;
  }

  .bot-right {
    grid-area: bot-right;
  }

</style>
