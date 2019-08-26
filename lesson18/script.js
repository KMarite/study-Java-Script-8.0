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
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

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
                clearInterval(idInterval);
                timerNumbers.style.color = 'red';
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        let idInterval = setInterval(updateClock, 1000);

        updateClock();
    };
    countTimer('1 august 2019');

    // меню

    // меню сдлано с помощью делегирования

    const toggleMenu = () => {

        const menu = document.querySelector('menu');
        document.body.addEventListener('click', () => {
            let target = event.target;
            if (target.closest('.menu')) {
                menu.classList.add('active-menu');
            } else if (target.classList.contains('close-btn')) {
                menu.classList.remove('active-menu');
            } else if (target.closest('ul > li')) {
                menu.classList.remove('active-menu');
            } else if (target.tagName !== 'MENU') {
                menu.classList.remove('active-menu');
            } else {
                return;
            }
        });
    };
    toggleMenu();



    // const toggleMenu = () => {

    //     const btnMenu = document.querySelector('.menu'),
    //         menu = document.querySelector('menu'),
    //         closeBtn = document.querySelector('.close-btn'),
    //         menuItems = menu.querySelectorAll('.close-btn ul li');

    //     const handlerMenu = () => {
    //         menu.classList.toggle('active-menu');
    //     };

    //     btnMenu.addEventListener('click', handlerMenu);
    //     closeBtn.addEventListener('click', handlerMenu);
    //     menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    // };

    // toggleMenu();

    // popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = popup.querySelector('.popup-content'),
            popupClose = document.querySelector('.popup-close');
        let count = 0,
            togglePopupInterval;

        // анимация модального окна popup

        const animate = () => {
            togglePopupInterval = requestAnimationFrame(animate);
            count++;
            const mob = window.matchMedia('max-width: 480px');
            if (count <= 38) {
                popupContent.style.left = count + '%';
            } else {
                cancelAnimationFrame(togglePopupInterval);
                count = 0;
            }
        };
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                togglePopupInterval = requestAnimationFrame(animate);
            });
        });

        popupClose.addEventListener('click', () => {
            cancelAnimationFrame(togglePopupInterval);
            count = 0;
            popup.style.display = 'none';
            popupContent.removeAttribute('style');
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                popupContent.removeAttribute('style');
            } else {
                target = target.closest('.popup-content');
                if (!target) {
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

    // слайдер 

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;


        for (let i = 0; i < slide.length; i++) {
            const dots = document.querySelector('.portfolio-dots'),
                newDot = document.createElement('li');
            if (i == 0) {
                newDot.setAttribute('class', 'dot dot-active');
                dots.appendChild(newDot);
            } else {
                newDot.setAttribute('class', 'dot');
                dots.appendChild(newDot);
            }

        }
        const dot = document.querySelectorAll('.dot');




        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 1000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1000);
    };

    slider();

    // блок "Наша команда"

    const img = document.querySelectorAll('.command__photo');
    let changeImg;

    img.forEach((elem) => {
        elem.addEventListener('mouseenter', (event) => {
            changeImg = event.target.getAttribute('src');
            event.target.src = event.target.dataset.img;
        });
        elem.addEventListener('mouseleave', (event) => {
            event.target.src = changeImg;
        });
    });

    // калькулятор

    const inputs = document.querySelectorAll('input.calc-item');
    inputs.forEach((elem) => {
        elem.addEventListener('keyup', (event) => {
            let target = event.target;
            target.value = target.value.replace(/\D/g, '');
            console.log(target.value);
        });
    });

    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }

        });

    };

    calc(100);

    // send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        const forms = document.querySelectorAll('form');
        
        forms.forEach((elem) => {
            const myInputs = elem.querySelectorAll('input');
            elem.addEventListener('submit', (event) => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(elem);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)
                    .then(statusMessage.textContent = successMessage)
                    .then(myInputs.forEach((input) => input.value = ''))
                    .catch(errorMessage => console.error(errorMessage));
               
        });

        // валидация 
        elem.addEventListener('input', (elem) => {
            if (elem.target.name === 'user_name'){
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яёА-ЯЁ\s]/gi, ``);
            } else if (elem.target.name === 'user_phone'){
                elem.srcElement.value = elem.srcElement.value.replace(/[^+0-9]/gi, ``);
            }  else if (elem.target.name === 'user_message'){
                elem.srcElement.value = elem.srcElement.value.replace(/[^а-яёА-ЯЁ\s]/gi, ``);
            } else {
                return;
            }
        });

        });
        
        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();         
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve(request.status);
                       
                    } else {
                        reject(request.status);
                    }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
            });

        };
        
    };
    sendForm();




















});