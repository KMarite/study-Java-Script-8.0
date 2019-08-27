'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer.js';
import toggleMenu from './modules/toggleMenu.js';
import togglePopup from './modules/togglePopup.js';
import tabs from './modules/tabs.js';
import slider from './modules/slider.js';
import ourTeam from './modules/ourTeam.js';
import calc from './modules/calc.js';
import sendForm from './modules/sendForm.js';
 
// Timer 
countTimer('29 august 2019');
// меню
toggleMenu();
// popup
togglePopup();
//  табы
tabs();
// слайдер 
slider();
// блок "Наша команда"
ourTeam ();
// калькулятор
calc(100);
// send-ajax-form
sendForm();