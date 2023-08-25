import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryPie, VictoryTooltip} from 'victory-native';

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
      labelComponent={
        <VictoryTooltip
          cornerRadius={5}
          pointerLength={8}
          flyoutStyle={{fill: 'white'}}
          style={{fontSize: 12}}
          renderInPortal={false}
          flyoutPadding={{top: 10, bottom: 10, left: 15, right: 15}}
        />
      }
      labelRadius={100}
      labelPlacement="perpendicular"
      padAngle={({datum}) => 2}
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
