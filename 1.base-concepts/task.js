'use strict';

function solveEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;

  if (d < 0) {
    return [];
  }

  if (d === 0) {
    return [ -b / (2 * a) ];
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);
  return [x1, x2];
}
solveEquation = solveEquation;

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let p = percent / 100 / 12;
  let loanBody = amount - contribution;

  if (isNaN(p) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
    return false;
  }

  let monthlyPayment = loanBody * (p + (p / ((1 + p) ** countMonths - 1)));
  let total = monthlyPayment * countMonths;

  return +total.toFixed(2);
}

calculateTotalMortgage = calculateTotalMortgage;
