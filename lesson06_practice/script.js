'use strict';

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 5000);
      console.log(money);
    }
    while (isNaN(money) || money == '' || money == ' ' || money == null);
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
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  addExpenses: [],
  mission: 100000,
  period: 6,
  asking: function () {

    if(confirm('Есть ли у Вас дополнительный источник заработка?')){
      let itemIncome;
      do {
        itemIncome = prompt('Какой у Вас дополнительный зароботок?', 'Фриланс');
      }
      while (Number(itemIncome) || itemIncome == '' || itemIncome == ' ' || itemIncome == 0);

      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 5000);
      }
      while (isNaN(cashIncome) || cashIncome == '' || cashIncome == ' ' || cashIncome == null);
          appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
    'Курсы, интернет, салон');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
     
      let questionSpend;
        do {
          questionSpend = prompt("Какие обязательные ежемесячные расходы у вас есть?", 'Интернет, коммунальные услуги');
        }
        while (Number(questionSpend) || questionSpend == '' || questionSpend == ' ' || questionSpend == 0);
      let questionNull;
          do {
            questionNull = prompt("Во сколько это обойдется?", 1500);
          } 
      while (isNaN(questionNull) || questionNull == '' || questionNull == ' ' || questionNull == null);
      
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
    let target = appData.mission / money;
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

  getInfoDeposit: function(){
    if(appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 12);
      } while 
        (isNaN(appData.percentDeposit) || appData.percentDeposit == ' ' || appData.percentDeposit == null);
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while 
        (isNaN(appData.moneyDeposit) || appData.moneyDeposit == '' || 
        appData.moneyDeposit == ' ' || appData.moneyDeposit == null);
    }
  },


  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
  
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();


for (let key in appData) {
  console.log('Наша программа включает в себя данные:' + key + appData);
}

console.log('Доход: ' + appData.budget + '; Дополнительный доход: ' + appData.income + 
' ; Расходы обязательные: ' + appData.addExpenses + ' ; Расходы дополнительные: ' + 
appData.expenses + ' ; Депозит: ' + appData.deposit);





