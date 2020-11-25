<template>
    <main class="calendar">
        <h1>My Calendar</h1>
        <div id="calendar">
            <div class="calendar-controls">
                <div>
                    <div class="control">
                        <div class="box">
                            <div class="select">
                                <select v-model="displayVariable">
                                    <option value="month">month</option>
                                    <option value="week">week</option>
                                </select>
                            </div>
                        </div>
                        <div class="box">
                            <div class="field">
                                <label class="label">Name of event</label>
                                <div class="control">
                                    <input type="text" class="input" v-model="title" id="title"/>
                                </div>
                                <div class="field">
                                    <label class="label">Start date</label>
                                    <div class="control">
                                        <input type="date" class="input" v-model="startDay" id="startDate"/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">End date</label>
                                    <div class="control">
                                        <input type="date" class="input" v-model="endDay" />
                                    </div>
                                </div>
                                <button class="button is-info" @click="addEvent"> Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                ref="calView">
            <calendar-view-header slot="header"
                slot-scope="{ headerProps }"
                :header-props="headerProps"
                :previous-year-label="themeOptions.previousYearLabel"
                :previous-period-label="themeOptions.previousPeriodLabel"
                :next-period-label="themeOptions.nextPeriodLabel"
                :next-year-label="themeOptions.nextYearLabel"
                @input="setShowDate" />
            </calendar-view>
            <calendar-view v-if="displayVariable ==='week'"
                :show-date="showDate"
                :enableDragDrop="true"
                :items="items"
                displayPeriodUom="week"
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
                ref="calView">
                <calendar-view-header
                    slot="header"
                    slot-scope="{ headerProps }"
                    :header-props="headerProps"
                    :previous-year-label="themeOptions.previousYearLabel"
                    :previous-period-label="themeOptions.previousPeriodLabel"
                    :next-period-label="themeOptions.nextPeriodLabel"
                    :next-year-label="themeOptions.nextYearLabel"
                    @input="setShowDate" />
            </calendar-view>
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
    
    export default {
        name: 'Calendar',
        title: 'Calendar',
        props: {

        },

        data: function () {
            return {
                showDate: new Date(),
                selectionStart: null,
                selectionEnd: null,
                theme: "gcal",
                items: Array(0),
                    //.fill()
                    //.map((_, i) => this.getRandomEvent(i)),
                startDay:"",
                endDay: "",
                title:"",
                displayVariable: "month"
                
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
            },
        },
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        mounted: function(){
            this.referenceEvents()
        },
        methods: {
            setShowDate(d) {
                this.showDate = d;

            },
            async addEvent() {
                //adding data to items array
                const startDay = new Date(this.startDay);
                const endDay = new Date(this.endDay);
                const title = this.title;
                const eventToAdd = {
                    title: title,
                    startDate: Date.UTC(startDay.getUTCFullYear(), startDay.getUTCMonth(), startDay.getUTCDate()+1),
                    endDate: Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth(), endDay.getUTCDate()+1),
                    UserId: this.$store.state.user.id
                }
                try {
                    const reponse = await EventService.createEvent(eventToAdd)
                    this.$store.dispatch('addEvent', reponse.data)
                } catch (error) {
                    this.error = error.response.data.error
                }
            },
            getRandomEvent(index) {
                const startDay = Math.floor(Math.random() * 28 + 1)
                const endDay = Math.floor(Math.random() * 4) + startDay
                var d = new Date()
                console.log(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), endDay))
                var i = {
                    id: index,
                    title: "Event " + (index + 1),
                    startDate: Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), startDay),
                    endDate: Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), endDay),
                    classes: Math.random() > 0.9 ? ["custom-date-class-red"] : null,
                }
                return i
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
            referenceEvents(){
                this.items = this.$store.state.events
            }
        }
    }

       
</script>
    
<style lang="scss" scoped>

    .cv-item.custom-date-class-red {
        background-color: #ff6666;
    }
    #calendar {
        display: flex;
        flex-grow: 1;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
        height: 67vh;
        width: 90vw;
        margin-left: auto;
        margin-right: auto;
    }
    .select select {
        background-color: #fff;
        border-color: #dbdbdb;
        color: #363636;
        cursor: pointer;
        display: block;
        font-size: 1em;
        max-width: 100%;
        outline: 0;
    }
    .select select:not([multiple]) {
        padding-right: 2.5em;
    }
    .calendar-controls {
        margin-right: 1rem;
        min-width: 14rem;
        max-width: 14rem;
    }
    .box {
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        color: #4a4a4a;
        display: block;
        padding: 1.25rem;
    }
    .field:not(:last-child){
        margin-bottom: .75rem;
    }
    .input, textarea {
        background-color: #f5f5f5;
        border-color: grey;
        color: #363636;
        box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
        max-width: 100%;
        width: 100%;
    }
    .button, .file-cta, .file-name, .input, .pagination-ellipsis, .pagination-link,
    .pagination-next, .pagination-previous, .select select, .textarea{
        align-items:center;
        border:1px solid transparent;
        border-radius: 4px;
        display:inline-flex;
        font-size:1rem;
        height:2.25em;
        justify-content:flex-start;
        line-height:1.5;
        padding-top: calc(.375em - 1px);
        padding-left: calc(0.375em - 1px);
        padding-bottom:calc(.375em - 1px);
        padding-right: calc(.625 - 1px);
        position: relative;
        vertical-align: top;
    }
</style>
