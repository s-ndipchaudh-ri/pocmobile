import React, { memo } from 'react';
import  PureChart  from 'react-native-pure-chart';

const RadarCharts = ({ data }) => {
  return <PureChart data={data} type='pie'/>;
};

export default memo(RadarCharts);
