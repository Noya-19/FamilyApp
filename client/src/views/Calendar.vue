<template>
    <main class="calendar">
        <h1>My Calendar</h1>
        <div id="calendar">
            <div class="calendar-controls">
                <div>
                    <div class="control">
                        <div class="box">
                            <div class="select">
                                <select>
                                    <option>month</option>
                                    <option>week</option>
                                    <option>day</option>
                                </select>
                            </div>
                        </div>
                        <div class="box">
                            <div class="field">
                                <label class="label">Name of event</label>
                                <div class="control">
                                    <input type="text" class="input"  id="titile"/>
                                </div>
                                <div class="field">
                                    <label class="label">Start date</label>
                                    <div class="control">
                                        <input type="date" class="input" id="startDate"/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">End date</label>
                                    <div class="control">
                                        <input type="date" class="input" id="endDate" />
                                    </div>
                                </div>
                                <button class="button is-info" @click="addEvent"> Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <calendar-view
                           :show-date="showDate"
                           class="theme-default holiday-us-traditional holiday-us-official">
                <calendar-view-header slot="header"
                                      slot-scope="t"
                                      :header-props="t.headerProps"
                                      @input="setShowDate"
                                    />

            </calendar-view>
        </div>
    </main>
</template>

<script>
    import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
    // The next two lines are processed by webpack. If you're using the component without webpack compilation,
    // you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
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
                items: [{
                    id: "1",
                    startDate: "2020-11-18",
                }]
            }
        },
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        methods: {
            setShowDate(d) {
                this.showDate = d;

            },
            addEvent() {
                //adding data to items array
                this.items.push({
                    startDate: this.newItemStartDate,
                    endDate: this.newItemEndDate,
                    title: this.newItemTitle,
                    id: "e" + Math.random().toString(36)

                }),
                console.log("added");

                /*send data to backend
                 * check for sucsess
                 * if sucsessfull clear data in field
                 */
                //document.getElementsByClassName('input').innerHTML = '';
                //document.getElementById('ename').innerHTML = '';
                //document.getElementById('endDate').value = '';


                 /* else resend data
                 */

            }

        }
    }

       
</script>
    
<style lang="scss" scoped>
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
