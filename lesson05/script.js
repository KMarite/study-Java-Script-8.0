'use strict';

let money,
  income = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у Вас депозит в банке?'),
  mission = 100000,
  period = 6;

/*let start = function(){
    money = prompt('Ваш месячный доход?');
    console.log(money);

    while (isNaN(money) || money == '' || money == null){
        money = prompt('Ваш месячный доход?');
        console.log(money);
    }
   
};

start();
*/

let start = function(){
    do {
        money = prompt('Ваш месячный доход?');
        console.log(money);
    }
    while (isNaN(money) || money == '' || money == null);
};
start();

let questionSpend1,
    questionSpend2;
    
let getExpensesMonth = function() {
    let sum = 0, expenses;
  for(let i = 0; i < 2; i++){

      if(i === 0){
        questionSpend1 = prompt("Какие обязательные ежемесячные расходы у вас есть?");
      } else if(i === 1){
        questionSpend2 = prompt("Какие обязательные ежемесячные расходы у вас есть?");
      }
      do{
        expenses = prompt("Во сколько это обойдется?");
      }
      while(isNaN(expenses) || expenses == '' || expenses == null);
        sum += +expenses;
  }      
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {  
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();


let getTargetMonth = function() {
 let target = mission / accumulatedMonth;
    if (target > 0){
      console.log('Цель будет достигнута');
    } else {
      console.log('Цель не будет достигнута');
    }
    return Math.floor(target);
};


let budgetDay = accumulatedMonth / 30;

function getStatusIncome(){
  if (budgetDay >= 800) {
    return('Высокий уровень дохода');
  } else if (budgetDay >= 300 && budgetDay < 800) {
    return('Средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 300) {
    return('Низкий уровень дохода');
  } else if (budgetDay < 0){
    return('Что то пошло не так');
  }
}
console.log('accumulatedMonth:', accumulatedMonth);
console.log('getTargetMonth():', Math.floor(getTargetMonth()));
console.log('getStatusIncome(): ', getStatusIncome());