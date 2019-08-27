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
export default toggleMenu;