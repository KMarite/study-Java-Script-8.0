'use strict';

function daysLeftNewYear() {
    let elemNY = document.createElement('div');
    let today = new Date(),
        dayNewYear = new Date(" 2019, december, 31,"),
        PerDay = 24 * 60 * 60 * 1000,
        daysLeft = Math.round((dayNewYear.getTime() - today.getTime()) / PerDay),
        nameDay = '',
        ds = '' + daysLeft,
        dd = parseInt(ds.substr(ds.length - 1));
    if (daysLeft > 4 && daysLeft < 21) {
        nameDay = " дней";
    } else if (dd == 1) {
        nameDay = " день";
    } else if (dd == 2 || dd == 3 || dd == 4) {
        nameDay = " дня";
    } else {
        nameDay = " дней";
    }
    if (daysLeft > 0) {
        elemNY.innerHTML = "До нового года осталось " + daysLeft + nameDay;
        document.body.appendChild(elemNY);
       
    }
}

daysLeftNewYear();


function clock(){
    let timeNow = document.createElement('div');
    timeNow = new Date().toLocaleTimeString('en');
    document.write('Текущее время: ' + timeNow);


    setInterval(clock, 1000);
    

}

   

    

