import React from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryBar,
  VictoryLabel,
} from 'victory-native';

const MonthlyChart = ({monthlyExpenses, monthlyIncomes, monthlyBalance}) => {
  const maxExpenseValue = Math.max(...monthlyExpenses.map(item => item.y));
  const maxIncomeValue = Math.max(...monthlyIncomes.map(item => item.y));
  const maxBalanceValue = Math.max(...monthlyBalance.map(item => item.y));
  const maxYValue = Math.max(maxExpenseValue, maxIncomeValue, maxBalanceValue);

  const generateTickValues = maxValue => {
    const tickValues = [];
    for (let i = 500; i <= maxValue; i += 500) {
      tickValues.push(i);
    }
    return tickValues;
  };

  return (
    <VictoryChart
      domainPadding={{x: 60}}
      animate={{duration: 500}}
      height={300}>
      <VictoryAxis
        dependentAxis
        tickValues={generateTickValues(maxYValue)}
        tickFormat={tick => `$${tick}`}
      />
      <VictoryAxis
        tickValues={monthlyExpenses.map(entry => entry.label)}
        tickFormat={monthlyExpenses.map(entry => entry.label)}
        style={{
          tickLabels: {
            fontSize: 10,
            padding: 5,
            angle: 45,
            textAnchor: 'start',
          },
        }}
      />
      <VictoryGroup offset={20}>
        <VictoryBar
          data={monthlyExpenses}
          x="label"
          y="y"
          style={{data: {fill: '#E57373', width: 15}}}
          labelComponent={<VictoryLabel text="" />}
        />
        <VictoryBar
          data={monthlyIncomes}
          x="label"
          y="y"
          style={{data: {fill: '#81C784', width: 15}}}
          labelComponent={<VictoryLabel text="" />}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default MonthlyChart;
