'use strict';

let money = +prompt('Ваш месячный доход?'),
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у Вас депозит в банке?'),
  mission = 100000,
  period = 6;

let showTypeof = function(item) {
  console.log(item, typeof item);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let questionSpend1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    expenses1 = +prompt("Во сколько это обойдется?"),
    questionSpend2 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    expenses2 = +prompt("Во сколько это обойдется?");


let getExpensesMonth = function() {
  return expenses1 + expenses2;
};


let getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};
let accumulatedMonth = getAccumulatedMonth();


let getTargetMonth = function() {
  return mission / accumulatedMonth;
};


let budgetDay = accumulatedMonth / 30;

function getStatusIncome(){
  if (budgetDay >= 800) {
    return('Высокий уровень дохода');
  } else if (budgetDay >= 300 && budgetDay < 800) {
    return('Средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 300) {
    return('Низкий уровень дохода');
  } else {
    return('Что то пошло не так');
  }
}
console.log('accumulatedMonth:', accumulatedMonth);
console.log('getTargetMonth():', Math.floor(getTargetMonth()));
console.log('getStatusIncome(): ', getStatusIncome());

