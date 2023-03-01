import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { useEffect,useState } from 'react';
import SocketService from './services/socket';
import {DataVisualization} from './container';


export default function App() {
  let sampleData = [
    {
      value: 10,
      label: 'Marketing',
      color: '#4287f5',
    }, {
      value: 40,
      label: 'Sales',
      color: '#657a9c'
    }, {
      value: 25,
      label: 'Support',
      color: '#555a61'
    }

  ]
  let sampleData1 = [
    {
      value: 100,
      label: 'Marketing',
      color: 'red',
    }, {
      value: 40,
      label: 'Sales',
      color: 'blue'
    }, {
      value: 25,
      label: 'Support',
      color: 'green'
    }

  ]
  const [rawData, setRawData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const generateRandomNumber = () => {
    return ((Math.random() * 255) | 0) + 1;
  };

  useEffect(() => {
    const socket = new SocketService('ws://192.168.0.101:8080');
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
    return () => {
      socket.closeWebSocket();
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(rawData)}</Text> */}
      {/* <PureChart  data={sampleData} type='pie'>
      </PureChart>
      <PureChart  data={sampleData1} type='pie' /> */}
      <DataVisualization />
      <Text>Open up Appstart working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
