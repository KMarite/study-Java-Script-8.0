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
  incomeItems = document.querySelectorAll('.income-items'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

class appData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
  }
  check() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled', 'disabled');
    }
  }
  start() {
    if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'disabled');
      return;
    }
    const allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    btnPlasExpAdd.setAttribute('disabled', 'disabled');
    btnPlasIncAdd.setAttribute('disabled', 'disabled');
    start.style.display = 'none';
    cansel.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getItem(expensesItems, 'expenses', this.expenses);
    this.getItem(incomeItems, `income`, this.income);
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }
  
  reset() {
    const inputTextData = document.querySelectorAll('.data input[type = text]'),
      resultInputAll = document.querySelectorAll('.result input[type = text]');
    if (inputTextData.value === 'text' && resultInputAll === 'text') {
      cansel.addEventListener('click', this.reset);
    }
    inputTextData.forEach((elem) => {
      elem.value = '';
      elem.removeAttribute('disabled', 'disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;

    });
    resultInputAll.forEach((elem) => {
      elem.value = '';
    });
    incomeItems = document.querySelectorAll('.income-items');
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnPlasIncAdd.style.display = 'block';
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnPlasExpAdd.style.display = 'block';
    }
    cansel.style.display = 'none';
    start.style.display = 'block';
    btnPlasExpAdd.removeAttribute('disabled', 'disabled');
    btnPlasIncAdd.removeAttribute('disabled', 'disabled');
    checkBox.checked = false;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incPeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () => {
      incPeriodValue.value = this.calcPeriod();
    });

  }
  addBlock(items, item, btn) {

    const cloneIncomeItem = items[0].cloneNode(true);
    items[0].parentNode.insertBefore(cloneIncomeItem, btn);
    items = document.querySelectorAll(`.${item}-items`);

    if (items.length === 3) {
      btn.style.display = 'none';
    }
  }

  getItem(collectionItems, clas, elem) {
    collectionItems =  document.querySelectorAll(`.${clas}-items`);
    collectionItems.forEach((item) => {
      const itemAll = item.querySelector(`.${clas}-title`).value;
      const cashAll = item.querySelector(`.${clas}-amount`).value;
      if (itemAll !== '' && cashAll !== '') {
        elem[itemAll] = cashAll;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = addExpItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    addIncItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth +
      (this.moneyDeposit * this.percentDeposit) / 12);
    this.budgetDay = Math.floor(this.budgetMonth / 30);

  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;

  }
  getStatusIncome() {
    if (this.budgetDay >= 800) {
      return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
      return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
      return ('Низкий уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  eventsListeners() {
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = 'true';
        depositBank.addEventListener('change', (event) => {
          const target = event.target;
          const selectIndex = target.options[target.selectedIndex].value;
          if (selectIndex === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.removeAttribute('disabled');
          } else {
            depositPercent.style.display = 'none';
            depositPercent.value = selectIndex;
          }
        });
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        this.deposit = 'false';
      }
    });

    start.addEventListener('click', () => {
      this.start();
    });
    btnPlasExpAdd.addEventListener('click', () => {
      this.addBlock(expensesItems, 'expenses', btnPlasExpAdd);
    });
    btnPlasIncAdd.addEventListener('click', () => {
      this.addBlock(incomeItems, 'income', btnPlasIncAdd);
    });
    salaryAmount.addEventListener('keyup', this.check);
    cansel.addEventListener('click', this.reset);

    periodSelect.addEventListener('change', () => {
      periodAmount.innerHTML = periodSelect.value;
    });

    const addExp = [];
    for (let i = 0; i < this.addExpenses.length; i++) {
      let element = this.addExpenses[i].trim();
      element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
      addExp.push(element);
    }
  }

}

const myProgramm = new appData();
myProgramm.eventsListeners();