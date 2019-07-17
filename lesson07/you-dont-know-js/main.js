'use strict';

let mainBook = document.querySelectorAll('.books'),
    collect = document.querySelectorAll('.book'),
    mainBody =  document.querySelectorAll('body'),
    promo = document.querySelectorAll('.adv'),
    firstBody = document.querySelector('body');
    

mainBook[0].insertBefore(collect[1], collect[0]);
mainBook[0].insertBefore(collect[4], collect[3]);
mainBook[0].insertBefore(collect[2], collect[5]);
mainBook[0].insertBefore(collect[5], collect[2]);

mainBody[0].removeChild(promo[0]);

let title3 = document.getElementsByTagName('a');
title3[2].textContent = 'Книга 3. this и Прототипы Объектов';

firstBody.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

let ulList = document.querySelectorAll('.book ul'),
liList = document.querySelectorAll('.book ul li');

ulList[1].insertBefore(liList[8], liList[16]);
ulList[1].insertBefore(liList[12], liList[10]);
ulList[1].insertBefore(liList[14], liList[10]);
ulList[4].insertBefore(liList[45], liList[39]);
ulList[4].insertBefore(liList[38], liList[42]);
ulList[4].insertBefore(liList[41], liList[44]);

let newCollect = document.createElement('li');

ulList[5].appendChild(newCollect);
newCollect.textContent = 'Глава 8: За пределами ES6';
ulList[5].insertBefore(newCollect, liList[56]);
