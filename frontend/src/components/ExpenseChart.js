import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryPie} from 'victory-native';

const ExpenseChart = ({categoryExpenses}) => (
  <View style={styles.chartContainer}>
    <VictoryPie
      data={categoryExpenses}
      colorScale={[
        '#E57373',
        '#81C784',
        '#64B5F6',
        '#FFD54F',
        '#BA68C8',
        '#FF8A65',
      ]}
      x="label"
      y="value"
      animate={{duration: 500}}
      height={350}
      style={{
        labels: {
          fontSize: 14,
          padding: 12,
        },
      }}
      labelRadius={80}
      labelPlacement="parallel"
    />
  </View>
);

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseChart;
