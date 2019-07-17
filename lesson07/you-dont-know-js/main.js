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

let secondBook = document.querySelectorAll('.books'),
secondCollect = document.getElementsByTagName('li');

// secondBook[0].insertBefore(secondCollect[12], secondCollect[9]);

let book6 = document.querySelectorAll('.book'),
    collect6 = document.getElementsByTagName('li');




console.log(secondBook);
console.log(secondCollect);
console.log(book6);
console.log(collect6);
