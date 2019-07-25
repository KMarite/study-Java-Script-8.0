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
    
  
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
   
    this.showResult();
    
  },
  reset: function(){
   
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');
    if(inputTextData.value === 'text' && resultInputAll === 'text'){
      cansel.addEventListener('click', this.reset);
    }
    inputTextData.forEach(function(elem){
     elem.value = '';
     elem.removeAttribute('disabled', 'disabled');
     periodSelect.value = '0';
     periodAmount.innerHTML = periodSelect.value; 

    });
    resultInputAll.forEach(function(elem){
      elem.value = '';
     });

     for (let i = 1; i < incomeItems.length; i++){
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnPlasIncAdd.style.display = 'block';
     }
     for (let i = 1; i < expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnPlasExpAdd.style.display = 'block';
     }

    cansel.style.display = 'none';
    start.style.display = 'block';
    btnPlasExpAdd.removeAttribute('disabled', 'disabled');
    btnPlasIncAdd.removeAttribute('disabled', 'disabled');
    checkBox.checked = false;
  },

  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function(){
      incPeriodValue.value = appData.calcPeriod();
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
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
          this.expenses[itemExpenses] = cashExpenses;
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
   incomeItems.forEach((item) => {
     let itemIncome = item.querySelector('.income-title').value;
     let cashIncome = item.querySelector('.income-amount').value;
   
     if (itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = cashIncome;
    }  
   });
    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    } 
  },
  getAddExpenses: function(){
    let addExpenses = addExpItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== ''){
       this.addExpenses.push(item);
      } 
    });   
  },
  getAddIncome: function(){
    addIncItem.forEach((item) => {
       let itemValue = item.value.trim();
       if(itemValue !== ''){
         this.addIncome.push(itemValue);
       }    
    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    
  },

  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
    
  },

  getStatusIncome: function () {
    if (this.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    } 
  },
  
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 12);
      } while (isNaN(this.percentDeposit) || this.percentDeposit == ' ' || this.percentDeposit == null);
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(this.moneyDeposit) || this.moneyDeposit == '' ||
      this.moneyDeposit == ' ' || this.moneyDeposit == null);
    } 
  },
 
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
    
  }, 
 
};

start.addEventListener('click', appData.start.bind(appData));
btnPlasExpAdd.addEventListener('click', appData.addExpensesBlock);
btnPlasIncAdd.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
cansel.addEventListener('click', appData.reset.bind(appData));


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

