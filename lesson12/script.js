window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //  Timer сделан с помощью setTimeout

    // function countTimer(deadline) {
    //     let timerHours = document.querySelector('#timer-hours'),
    //         timerMinutes = document.querySelector('#timer-minutes'),
    //         timerSeconds = document.querySelector('#timer-seconds');

    //     function getTimeRemaining() {
    //         let dateStop = new Date(deadline),
    //             dateNow = new Date().getTime(),
    //             timeRemaining = (dateStop - dateNow) / 1000,
    //             seconds = Math.floor(timeRemaining % 60),
    //             minutes = Math.floor((timeRemaining / 60) % 60),
    //             hours = Math.floor(timeRemaining / 60 / 60);
    //         return {timeRemaining, hours, minutes, seconds};
    //     }

    //     function updateClock() {
    //         let timer = getTimeRemaining();

    //         timerHours.textContent = timer.hours;
    //         timerMinutes.textContent = timer.minutes;
    //         timerSeconds.textContent = timer.seconds;

    //        if(timer.timeRemaining > 0){
    //         setTimeout(updateClock, 1000);
    //        }
    //     }

    //     updateClock();
    // }
    // countTimer('06 august 2019');


    // Timer сделан с помощью setInterval

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60); 
            return {timeRemaining, hours, minutes, seconds};
        }
        function updateClock() {
            let timerNumbers = document.querySelector('.timer-numbers'); 
            let idInterval = setInterval(updateClock, 1000); 
            let timer = getTimeRemaining();
            if(timer.timeRemaining > 0){
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
               }
               else if (timer.timeRemaining == 0){
                   clearInterval(idInterval);
               }    
            if(timerHours.textContent < 10)  {
                timerHours.textContent = '0' + timer.hours;
            } 
            if(timerMinutes.textContent < 10){
                timerMinutes.textContent = '0' + timer.minutes;
            } 
            if(timerSeconds.textContent < 10){
                timerSeconds.textContent = '0' + timer.seconds;
            }
            if(timer.timeRemaining <= 0){
                timerNumbers.style.color = 'red';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';   
                timerSeconds.textContent = '00';           
            }
            
        }
        updateClock();
    }
    countTimer('08 august 2019');
    
});