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
export default togglePopup;