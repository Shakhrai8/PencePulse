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
