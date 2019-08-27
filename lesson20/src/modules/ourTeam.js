const ourTeam = () => {
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
};
export default ourTeam;