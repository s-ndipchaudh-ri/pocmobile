import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RadarChart } from '../components';
import { SocketService } from '../services';

const DataVisualization = () => {
  const [rawData, setRawData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const generateRandomNumber = () => {
    return ((Math.random() * 255) | 0) + 1;
  };

  useEffect(() => {
    const socket = new SocketService('ws://192.168.0.100:8080');
    socket.connectWebSocket('', (event) => {
      setRawData(event.data);

      let groups = Object.values(JSON.parse(event.data));
      if (groups) {
        let labels = Object.keys(groups[0]);

        let datasets = groups.map((item, index) => {
          return {
            label: `Group ${index + 1}`,
            data: Object.values(item),
            backgroundColor: `rgba(${generateRandomNumber()}, 99, ${generateRandomNumber()}, 0.2)`,
            borderColor: 'rgba(99, 99, 132, 1)',
            borderWidth: 1,
          };
        });
        if (labels && datasets) setChartData({ labels, datasets });
      }
    });
// unmount component
setRawData([
  {
    value: 10,
    color: '#4287f5',
  }, {
    value: 40,
    color: '#657a9c'
  }, {
    value: 25,
    color: '#555a61'
  }

])
    return () => {
      socket.closeWebSocket();
    };
  }, []);

  return (
    <View>
      <RadarChart data={rawData} />
    </View>
  );
};

export default DataVisualization;
