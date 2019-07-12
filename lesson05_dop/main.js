'use strict';

/*Создать массив arr = []
Записать в него 7 любых многозначных чисел в виде строк
Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)*/


let arr = ['255', '362', '84', '4862', '2369', '64', '410'];
arr.forEach(function (arr) {

    if (arr.startsWith(2) || arr.startsWith(4)) {
        console.log(parseInt(arr));
    }
});




prime:
    for (var i = 2; i <= 100; i++) {

        for (var n = 2; n < i; n++) {
            if (i % n == 0) continue prime;
        }
        console.log(i + '-' + ' Делители этого числа' + ': 1 и ' + i);
    }

