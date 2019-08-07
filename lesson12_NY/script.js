'use strict';

// Вывести текущий день и время  на страницу в таком формате

// Добрый день (утро, вечер, ночь в зависимости от времени суток)

function hello (){
    let hi = document.createElement('div');
    let hour = new Date().getHours();
    let salute;
        if (hour >= 6 && hour < 12){
            salute = 'Доброе утро';
        } else if(hour >= 12 && hour < 18){
            salute = 'Добрый день';
        } else if(hour >= 18 && hour < 24){
            salute = 'Добрый вечер';
        } else if(hour >= 0 && hour < 6){
            salute = 'Доброй ночи';
        }     
      hi.innerHTML = salute;
      document.body.appendChild(hi);
}
hello();

// Сегодня: Понедельник

function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']; 
    return days[date.getDay()];
  }

  let date = new Date(); 
  let elemWeek = document.createElement('div');
  elemWeek.innerHTML = 'Сегодня: ' + getWeekDay(date); 
  document.body.appendChild(elemWeek);

//   Текущее время:12:05:15 PM

function clock(){   
    let elemtime = document.createElement('div'), 
        timeNow = new Date().toLocaleTimeString('en');
        elemtime.innerHTML = 'Текущее время: ' + timeNow;    
        document.body.appendChild(elemtime); 

}


//   До нового года осталось 175 дней

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

