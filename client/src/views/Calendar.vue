<template>
    <main class="calendar">
        <h1>CALENDAR</h1>

        <div class="grid-container">
            <div class="item1">
                <div id='calendar'></div>
            </div>
            <div class="item2">2</div>
            <div class="item3">
                <!--<div id="listView"></div>-->
            </div>

        </div>
    </main>
</template>

<script>
  export default {
    name: 'Calendar',
    title: 'Calendar',
    props: {

    
    },
    methods: {
        createCalendar() {
            document.addEventListener('DOMContentLoaded', function () {
                var calendarEl = document.getElementById('calendar');

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    initialDate: '2020-10-07',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listWeek'
                    },
                    events: [
                        {
                            title: 'Birthday Party',
                            start: '2020-10-07T07:00:00'
                        }
                    ]
                });

                calendar.render();
            });

           /*document.addEventListener('DOMContentLoaded', function () {
                var calendarE1 = document.getElementById('dayView');
                var dayView = new FullCalendar.Calendar(calendarE1, {
                    initialView: 'dayTimeGrid',
                    events: [
                        {
                            title: 'Birthday Party',
                            start: '2020-10-07T07:00:00'
                        }
                    ]
                });
                listView.render();
            });*/
        }
        },
        mounted: function () {
           
            let calendarScript = document.createElement('script')
            calendarScript.setAttribute('src', '../fullcalendar/main.js')
            document.head.appendChild(calendarScript)
            this.createCalendar();
        }

    }
       
</script>
    
<style lang="scss" scoped>
    @import "../fullcalendar/main.css";
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 0.5fr 1fr;
        grid-gap: 10px;
        background-color: black;
        padding: 10px;
    }

        .grid-container > div {
            background-color: #e7e7e7;
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
        }

    .item1 {
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .item2 {
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .item3 {
        grid-row-start: 1;
        grid-row-end: 3;
    }
</style>
