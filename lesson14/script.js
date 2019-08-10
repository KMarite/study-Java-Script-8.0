window.addEventListener('DOMContentLoaded', () => {
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

    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        };
        const updateClock = () => {
            const timerNumbers = document.querySelector('.timer-numbers');
            const idInterval = setInterval(updateClock, 1000);
            const timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            } else if (timer.timeRemaining == 0) {
                clearInterval(idInterval);
            }
            if (timerHours.textContent < 10) {
                timerHours.textContent = '0' + timer.hours;
            }
            if (timerMinutes.textContent < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            }
            if (timerSeconds.textContent < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            }
            if (timer.timeRemaining <= 0) {
                timerNumbers.style.color = 'red';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        };
        updateClock();
    };
    countTimer('15 august 2019');

    // меню

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content');
        let count = 0;

        const animate = () => {
            count++;
            popupContent.style.left = 0;
            popupContent.style.left = count * 2 + 'px';
            const mob = window.matchMedia('max-width: 480px');
            if (count < 320) {
                setTimeout(animate, 10);
            } else {
                count = 0;
            }
            if (mob < 992) {
                clearTimeout(animate);
            }
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                animate();
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
                popupContent.removeAttribute('style');
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
            }
            }
            
        });
      

    };
    togglePopup();

    //  табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
























});