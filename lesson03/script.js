'use strict';

let money = +prompt('Ваш месячный доход?'),
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = prompt('Есть ли у Вас депозит в банке?'),
  mission = 100000,
  period = 6;

if (deposit === 'да'){
  console.log(true);
} else {
  console.log(false);
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let questionSpend1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    expenses1 = +prompt("Во сколько это обойдется?"),
    questionSpend2 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    expenses2 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - expenses1 - expenses1;
console.log(budgetMonth);

let goalAchieved = mission / budgetMonth; 
console.log(Math.ceil(goalAchieved));

let budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));


if (budgetDay >= 800){
  console.log('Высокий уровень дохода');
} else if (budgetDay >= 300 && budgetDay <= 800){
  console.log('Средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <= 300){
  console.log('Низкий уровень дохода');
} else {
  console.log('Что то пошло не так');
}



