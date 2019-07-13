'use strict';


 let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
     toDay = new Date().getDay() - 1;

 for (let i = 0; i < week.length; i++) {
   if (i == toDay) {
     if (week[i] == 'суббота' || week[i] == 'воскресенье') {
       document.write(`<p><b><i>${week[i]}</i></b></p>`);
     } else {
       document.write(`<p><b>${week[i]}</b></p>`);
     }
   } else if (week[i] == 'суббота' || week[i] == 'воскресенье') {
     document.write(`<p><b>${week[i]}</b></p>`);
   } else {
     document.write(`<p>${week[i]}</p>`);
   }
 }
 console.log(week);

