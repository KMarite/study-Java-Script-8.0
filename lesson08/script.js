'use strict';

let start = document.getElementById('start'),
  btnPlasIncAdd = document.getElementsByTagName('button')[0],
  btnPlasExpAdd = document.getElementsByTagName('button')[1],
  checkBox = document.querySelector('#deposit-check'),
  addIncItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector('.result-budget_day'),
  expMonthValue = document.querySelector('.result-expenses_month'),
  addIncomeValue = document.querySelector('.result-additional_income'),
  addExpValue = document.querySelector('.result-additional_expenses'),
  incPeriodValue = document.querySelector('.result-income_period'),
  targetMonthValue = document.querySelector('.result-target_month'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-items input'),
  incomeAmount = document.querySelector('.income-amount'),
  expTitle = document.querySelector('.expenses-items input'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodRange = document.querySelector('.period-select'),
  budMonth = document.querySelector('.result-budget_month');

let appData = {
  budget: 0,
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
  start: function () {

    if (salaryAmount.value === ''){
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
   
    appData.budget = salaryAmount.value;
    
    appData.getExpenses();

    // appData.asking();
    // appData.getExpensesMonth();
    // appData.getBudget();
    // appData.getTargetMonth();
    // appData.getStatusIncome();
    // appData.getInfoDeposit();
  },
  addExpensesBlock: function(){
    let expensesItems = document.querySelectorAll('.expenses-items');
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlasExpAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      btnPlasExpAdd.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount');
        if(itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
        }
    });
  },

  asking: function () {

    if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
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

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
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
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let target = appData.mission / appData.budget;
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

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 12);
      } while (isNaN(appData.percentDeposit) || appData.percentDeposit == ' ' || appData.percentDeposit == null);
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(appData.moneyDeposit) || appData.moneyDeposit == '' ||
        appData.moneyDeposit == ' ' || appData.moneyDeposit == null);
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },


};

start.addEventListener('click', appData.start);
btnPlasExpAdd.addEventListener('click', appData.addExpensesBlock);


let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
  let element = appData.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  addExp.push(element);
}

console.log(addExp.join(', '));