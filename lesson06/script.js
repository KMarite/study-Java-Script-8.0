'use strict';

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 5000);
      console.log(money);
    }
    while (isNaN(money) || money == '' || money == null);
  };
start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  mission: 100000,
  period: 6,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
     
      let questionSpend = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
          questionNull;
          do {
            questionNull = prompt("Во сколько это обойдется?");
          } 
      while (isNaN(questionNull) || questionNull == '' || questionNull == null);
      appData.expenses[questionSpend] = questionNull;
  
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  
  getBudget: function () {
    appData.budgetMonth = appData.budget -appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  
  getTargetMonth: function () {
    let target = appData.mission / appData.getBudget;
    if (target > 0) {
      console.log('Цель будет достигнута');
    } else {
      console.log('Цель не будет достигнута');
    }
    return Math.floor(target);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (appData.budgetDay >= 300 && appData.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  },
  
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

for (let key in appData) {
  console.log('Наша программа включает в себя данные:' + key + appData[key]);
}




