function showTime(){
    var today = new Date();
    var hours = today.getHours(); // 0 - 23
    var minutes = today.getMinutes(); // 0 - 59
    var seconds = today.getSeconds(); // 0 - 59
    var session = "AM";

    if(hours === 0){
        hours = 12;
    }
    if (hours > 12){
        hours = hours - 12;
        session = "PM";
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    const time = hours + ":" + minutes + ":" + seconds + " " + session;
    document.getElementById("time").innerText = time;
    document.getElementById("time").textContent = time;

    setTimeout(showTime, 1000);
}

function showDate() {
    var today = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();

    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;

    document.getElementById("date").innerText = date;
    document.getElementById("date").textContent = date;

    setTimeout(showDate, 1000);
}

showTime();
showDate();