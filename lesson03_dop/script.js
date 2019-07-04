'use strict';

let lang = prompt('Введите язык ru или en'),
    weekRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    weekEn = ['Mn', 'Ts', 'Wd', 'Th', 'Fr', 'St', 'Sn'];


if (lang == 'ru') {
   confirm(weekRu);
} else {
  confirm(weekEn);
}

switch (lang) {
  case 'ru':
    confirm(weekRu);
    break;
 case 'en':
   confirm(weekEn);
 break;
}

let arr = {
  'ru': weekRu,
  'en': weekEn,
};
confirm(arr[lang]);


