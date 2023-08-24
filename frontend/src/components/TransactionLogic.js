export const getMonthlyTotals = transactions => {
  const monthlyTotals = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYearKey = `${date.toLocaleDateString('default', {
      month: 'short',
    })}-${date.getFullYear()}`;

    if (!monthlyTotals[monthYearKey]) {
      monthlyTotals[monthYearKey] = {label: monthYearKey, y: 0};
    }

    monthlyTotals[monthYearKey].y += transaction.amount;
  });

  return Object.values(monthlyTotals).sort(
    (a, b) => new Date('01-' + a.label) - new Date('01-' + b.label),
  );
};

export const getCategoryTotals = transactions => {
  const categoryTotals = {};

  transactions.forEach(transaction => {
    const category = transaction.category || 'Others';

    if (!categoryTotals[category]) {
      categoryTotals[category] = {label: category, value: 0};
    }

    categoryTotals[category].value += transaction.amount;
  });

  return Object.values(categoryTotals);
};

export const calculateStatistics = (expenses, incomes) => {
  let totalExpenses = 0;
  let totalIncomes = 0;
  let largestExpense = {};
  let largestIncome = {};
  let categoriesCount = {};

  for (let expense of expenses) {
    totalExpenses += expense.amount;

    if (!largestExpense.amount || expense.amount > largestExpense.amount) {
      largestExpense = expense;
    }

    if (!categoriesCount[expense.category]) {
      categoriesCount[expense.category] = 0;
    }
    categoriesCount[expense.category]++;
  }

  for (let income of incomes) {
    totalIncomes += income.amount;

    if (!largestIncome.amount || income.amount > largestIncome.amount) {
      largestIncome = income;
    }
  }

  let mostFrequentCategory;
  let highestCount = 0;

  for (let category in categoriesCount) {
    if (categoriesCount[category] > highestCount) {
      highestCount = categoriesCount[category];
      mostFrequentCategory = category;
    }
  }

  const averageMonthlyExpense = expenses.length
    ? totalExpenses / expenses.length
    : 0;
  const averageMonthlyIncome = incomes.length
    ? totalIncomes / incomes.length
    : 0;

  const currentBalance = totalIncomes - totalExpenses;

  const currentYear = new Date().getFullYear();
  const numberOfYearsWithData = Math.ceil(
    Math.max(expenses.length, incomes.length) / 12,
  );

  const averageYearlyExpense = numberOfYearsWithData
    ? totalExpenses / numberOfYearsWithData
    : 0;
  const averageYearlyIncome = numberOfYearsWithData
    ? totalIncomes / numberOfYearsWithData
    : 0;

  return {
    totalExpenses,
    totalIncomes,
    largestExpense,
    largestIncome,
    mostFrequentCategory,
    averageMonthlyExpense,
    averageMonthlyIncome,
    currentBalance,
    averageYearlyExpense,
    averageYearlyIncome,
  };
};
