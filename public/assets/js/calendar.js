document.addEventListener('DOMContentLoaded', function() {
  var schedule = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      schedule = JSON.parse(this.responseText);
      console.log(schedule.blocks)
      schedule.blocks = schedule.blocks.map((block) => {
        return {
          title: block.title,
          start: block.start,
          end: block.end
        }
      });

      console.log(schedule.blocks)

      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2021-05-26',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: schedule.blocks
      });
      // calendarInstance.createSchedules(schedule.blocks);
      calendar.render();
    }
  };
  xhttp.open("GET", "/schedules/1", true);
  xhttp.send();
});
