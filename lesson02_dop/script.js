let num = 266219,
    str = String(num),
    total = str.split('');

total = total.reduce(function(product, value) {
  return product * value
});
console.log(total);

let total2 = total ** 3;
console.log(String(total2).slice(0, 2));