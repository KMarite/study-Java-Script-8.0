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

export default countTimer;