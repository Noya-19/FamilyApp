<template>
    <main class="dashboard">
        <div class="grid-container">
            <div class="header"><h1>FAMTASTIC</h1></div>
            <div class="left"> Shopping List</div>
            <div class="right">
                <h2>Calendar</h2>
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

            </div>
            <div class="bot-left">People</div>
            <div class="footer">
                <h2>Chores List</h2>
                <div id="choresTable">
                    <v-simple-table :height="heightOfCalTable"
                                    :fixed-header="true">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Chore</th>
                                    <th class="text-left">Due Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in choreList" :key="item.choresName">
                                    <td>{{item.title}}</td>
                                    <td>{{item.dueDate}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>
            </div>
        </div>
    </main>
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
                dueDate:'',
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
            fillWeekly() {
                this.items.forEach(item => {
                    this.weeklyEvents.push(item)
                })
                this.weeklyEvents = this.weeklyEvents.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));
                this.weeklyEvents = this.weeklyEvents.reverse();
            },

        },

        mounted: function () {
            this.referenceEvents()
            this.fillWeekly();
            this.referenceChores()
        }
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
        grid-template-columns: 25.5rem 25.5rem 25.5rem 25.5rem; /*200px 200px 200px 200px 200px 200px;*/
        grid-template-rows: 2.5rem 25rem auto;
        padding-left: $lg-gutter;
        padding-right: $lg-gutter;
        background-color: $light-gray;
        //background-color: black;
    }

    .grid-container {
        display: grid;
        grid-template-areas: "header header header header" "left left right right" "bot-left footer right right";
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
        color: black;
        border: 0.0625rem solid $border-white;
        border-color: black;
        border-radius: 0.625rem;
        background-color: #F8F8F8;
        border-color: black;
        border-width: 0.125rem;
    }

    .header {
        padding-top: 1rem;
    }

    /* Style the left column */
    .left {
        grid-area: left;
        height: 25rem;
    }

    /* Style the middle column */
    .right {
        grid-area: right;
        height: 51rem;
    }

    /* Style the bot-left column */
    .bot-left {
        grid-area: bot-left;
        height: 23.5rem;
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

    /* Style the footer */
    .footer {
        grid-area: footer;
        height: 23.5rem;
        //background-color: #67A4E1;
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
