// Задача 1
function getPercents(percent, number) {
  return (percent / 100) * number;
}

// Задача 2
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let loanBody = amount - contribution;
  let monthlyRate = (percent / 100) / 12;
  let monthlyPayment = loanBody * (monthlyRate + (monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1)));
  let totalAmount = monthlyPayment * countMonths;
  
  return Number(totalAmount.toFixed(2));
}
