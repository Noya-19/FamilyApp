<template>
    <v-main class="dashboard">
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
              <h2> Shopping List </h2>
              <v-spacer></v-spacer>
              </v-toolbar>
              <v-container class="home__container">
                <v-card-actions></v-card-actions>
                <v-simple-table id="shopping-list-table"
                                fixed-header>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Item</th>
                      
                    </tr>
                  </thead>
                  <tr v-for="(item, index) in itemsList">
                    <td>
                      
                    </td>
                    <td>
                    
                    </td>
                  </tr>
                </v-simple-table>
              </v-container>
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
              <h2>Calendar</h2>
              <v-spacer></v-spacer>
              </v-toolbar>

              <div id="calendar" class="calView">
                    <calendar-view v-if="displayVariable ==='month'"
                                   :show-date="showDate"
                                   :enableDragDrop="true"
                                   :items="items"
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
                <h2>Events</h2>
                <div id="calTable">
                    <v-simple-table :height="heightOfCalTable"
                                    :fixed-header="true">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Start</th>
                                    <th class="text-left">End</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in weeklyEvents" :key="item.title">
                                    <td>{{ item.title }}</td>
                                    <td>{{ item.startDate }}</td>
                                    <td>{{ item.endDate }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

              <v-container class="home__container">
              <v-card-actions></v-card-actions>
              </v-container>
              </v-card>




            </div>

            <div class="bot-left">
              <v-card elevation="4"
                      outlined
                      class="mx-auto"
                      width="100%"
                      height="100%">

                <v-toolbar color="indigo darken-4"
                           dark>
                  <h2>People</h2>
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
              <h2>Chores List</h2>
              <v-spacer></v-spacer>
              </v-toolbar>
                <div id="choresTable">
                <v-simple-table :height="heightOfCalTable"
                                :fixed-header="true">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class>Chore</th>
                                <th class>Due Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in incompletedChores" :key="item.choresName">
                                <td>{{item.title}}</td>
                                <td>{{item.dueDate}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>

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
        name: 'Dashboard',
        title: 'Dashboard',
        components: {
        },

        data() {
            return {
                showDate: new Date(),
                selectionStart: null,
                selectionEnd: null,
                theme: "gcal",
                items: [],
                startDay: "",
                endDay: "",
                title: "",
                displayVariable: "month",
                selectedEvent: {},
                weeklyEvents: [],
                heightOfCalTable: '300px',
                choreList: [],
                incompletedChores:[],
                dueDate: '',
                today: "",
                weekStart: "",
                weekEnd: "",
                dayEnd: '',
                itemsList:[],
                tempList: [
                  {
                    quantity: "12",
                    itemName: 'Eggs',
                    inEditMode: false,
                  },
                  {
                    quantity: "1",
                    itemName: 'Milk',
                    inEditMode: false,
                  },
                  {
                    quantity: "1",
                    itemName: 'FFVII',
                    inEditMode: false,
                  },
                ],
                name: "",
                people:[],
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
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        methods: {
            selectEvent(event) {
                this.selectedEvent = event
            },

            setShowDate(d) {
                this.showDate = d;
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
            referenceEvents() {
                this.items = this.$store.state.events
            },
            referenceChores() {
                this.choreList = this.$store.state.chores
            },
            fillDash() {
              var today = new Date()
              today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              today = Date.parse(today)

              this.weeklyEvents = []
              this.items.forEach(item => {
                  this.weeklyEvents.push(item)
              })
              this.weeklyEvents = this.weeklyEvents.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));
              this.weeklyEvents = this.weeklyEvents.reverse();
              var index = 0
              this.weeklyEvents.forEach((event) => {
                if(Date.parse(event.startDate) >= today){
                  this.weeklyEvents = this.weeklyEvents.splice(index)
                  return
                }
                index++
              })
              this.incompletedChores = []
              this.incompletedChores = this.choreList.filter(function(e) {
                return !e.isComplete
              })
            },          
            fillPeople() {
              this.$store.state.family.forEach(user => {
                this.people.push(user.firstname + " " + user.lastname)
              })
            },
        },

        async mounted(){
          //Data doesn't load in properly if chores referenced second. Might be because of the amount of data in events
          await this.referenceChores()
          await this.referenceEvents()
          await this.fillPeople()
        },

        async updated(){
          //Currently goes through many loops on load
          await this.fillDash();
        },
    }
</script>

<style lang="scss">
    @import '../scss/variables.scss';
    /*#calTable{
       max-height:100px;
    }*/
    #choresTable{
        max-height:inherit;
        max-width:inherit
    }
    .monthNameFormat {
        align-self: center;
    }
    #calendar {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: 45vh;
        width: inherit;
        margin-left: auto;
        margin-right: auto;
    }

    .grid-container {
        grid-template-columns: 25% 25% 25% 25%; //200px 200px 200px 200px 200px 200px;
        grid-template-rows: 25rem auto;
        padding-right: $lg-gutter;
        background-color: $light-gray;
        //background-color: black;
    }

    .grid-container {
        display: grid;
        grid-template-areas: "left left right right" "bot-left footer right right";
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        text-align: center;
    }

    .left,
    .right,
    .bot-left,
    .footer {
        margin-top: 0.625rem;
        //height: 50rem;
        padding: 0.625rem;
    }

    // Style the left column
    .left {
        grid-area: left;
        //height: 25rem;
    }

    // Style the middle column
    .right {
        grid-area: right;
        //height: 51rem;
    }

    .bot-left{
      grid-area: bot-left;
    }

    .footer{
      grid-area: footer;
    }

    h2{
      text-align: center;

    }
</style>
