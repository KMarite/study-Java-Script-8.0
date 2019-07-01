let money = 5000,
    income = 'Фриланс',
    addExpenses = 'Интернет, салон, коммуналка',
    deposit = true,
    mission = 100000,
    period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' гривен');

addExpenses = addExpenses.toLowerCase().split(", ");
console.log(addExpenses);

let budgetDay = money/30;

console.log(budgetDay);
console.log(budgetDay % 2);
