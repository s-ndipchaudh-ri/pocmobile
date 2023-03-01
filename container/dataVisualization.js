import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PureCharts } from '../components';
import { SocketService } from '../services';

const DataVisualization = () => {
const [one,setOne] = useState(null)
const colors = ['#4287f5','red','black','gray','green']
  useEffect(() => {
    const socket = new SocketService('ws://192.168.0.101:8080');
    socket.connectWebSocket('', (event) => {
      setRawData(event.data);
      let groups = Object.values(JSON.parse(event.data));
      if (groups) {
        setChartData(groups)
        groups.map(i => {
          let tempArr = []
          Object.values(i).map((j,index) => {
            let obj = {
              value: parseFloat(j),
              color: colors[index]
            }
            tempArr.push(obj)
          })
          setOne(tempArr)
        })
      }
    });
// unmount component
    return () => {
      socket.closeWebSocket();
    };
  }, []);

  return (
    <View>
      {
        one && <PureCharts data={one} />
      }
    </View>
  );
};

export default DataVisualization;
