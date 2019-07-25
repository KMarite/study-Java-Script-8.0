'use strict';

let start = document.getElementById('start'),
  cansel = document.getElementById('cancel'),
  btnPlasIncAdd = document.getElementsByTagName('button')[0],
  btnPlasExpAdd = document.getElementsByTagName('button')[1],
  checkBox = document.querySelector('#deposit-check'),
  addIncItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector('.result-budget_day input'),
  expensesMonthValue = document.querySelector('.result-expenses_month input'),
  addIncomeValue = document.querySelector('.result-additional_income input'),
  addExpValue = document.querySelector('.result-additional_expenses input'),
  incPeriodValue = document.querySelector('.result-income_period input'),
  targetMonthValue = document.querySelector('.result-target_month input'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-items input'),
  expTitle = document.querySelector('.expenses-items input'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  budgetMonthValue = document.querySelector('.result-budget_month input'),
  incomeItems = document.querySelectorAll('.income-items');

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  addExpenses: [],
  check: function(){
    if (salaryAmount.value !== ''){
      start.removeAttribute('disabled', 'disabled');
    }
  },
  start: function () {
    if (salaryAmount.value === ''){
      start.setAttribute('disabled', 'disabled');
      return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
      allInput.forEach(function (item){
        item.setAttribute('disabled', 'disabled');
    });
    btnPlasExpAdd.setAttribute('disabled', 'disabled');
    btnPlasIncAdd.setAttribute('disabled', 'disabled');
    start.style.display = 'none';
    cansel.style.display = 'block';
  
    appData.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    
    this.showResult();
  },
  reset: function(){
   
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');
    if(inputTextData.value === 'text' && resultInputAll === 'text'){
      cansel.addEventListener('click', appData.reset);
    }
    inputTextData.forEach(function(elem){
     elem.value = '';
     elem.removeAttribute('disabled', 'disabled');
     
    });
    resultInputAll.forEach(function(elem){
      elem.value = '';
     });
     
    cansel.style.display = 'none';
    start.style.display = 'block';
    btnPlasExpAdd.removeAttribute('disabled', 'disabled');
    btnPlasIncAdd.removeAttribute('disabled', 'disabled');


  },

  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('change', function(){
      incPeriodValue.value = this.calcPeriod();
    });
   
  },
  
  addExpensesBlock: function(){
    
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
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
        }
    });    
  },
  addIncomeBlock: function(){
    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlasIncAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
      btnPlasIncAdd.style.display = 'none';
    }
  },
  getIncome: function(){
   incomeItems.forEach(function(item){
     let itemIncome = item.querySelector('.income-title').value;
     let cashIncome = item.querySelector('.income-amount').value;
   
     if (itemIncome !== '' && cashIncome !== ''){
      appData.income[itemIncome] = cashIncome;
    }  
   });
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }  
  },
  getAddExpenses: function(){
    let addExpenses = addExpItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      } 
    }); 
  },
  getAddIncome: function(){
    addIncItem.forEach(function(item){
       let itemValue = item.value.trim();
       if(itemValue !== ''){
         appData.addIncome.push(itemValue);
       }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
 
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
 
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
  
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
 
};

start.addEventListener('click', appData.start.bind(appData));
btnPlasExpAdd.addEventListener('click', appData.addExpensesBlock);
btnPlasIncAdd.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
cansel.addEventListener('click', appData.reset);


periodSelect.addEventListener('change', function(){
    periodAmount.innerHTML = periodSelect.value;
  });

let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
  let element = appData.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  addExp.push(element);
}
console.log(addExp.join(', '));



// inputTextData.forEach(function (item){
//   start.addEventListener('click', function (){

//     item.setAttribute('disabled', 'disabled');
//     start.style.display = 'none';
//     cansel.style.display = 'block';
//   });
// });

