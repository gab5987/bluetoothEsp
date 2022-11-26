import { StatusBar } from 'expo-status-bar';
import { BleManager, Device } from 'react-native-ble-plx';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useRef } from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      devices: [],
    };
  }

  scan() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(device.name);
      this.setState({ devices: [...this.state.devices, device] });
      this.manager.stopDeviceScan();
    });
  }

  render() {
    this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log('BLE is powered on');
        this.scan();
      }
    }, true);
    return (
      <View style={styles.container}>
        <Text>Funcionou muito</Text>
        {/* list with devices */}
        {this.state.devices.map((device) => (
          <Text>{device.name}</Text>
        ))}
        <StatusBar style="auto" />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
