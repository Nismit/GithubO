import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadText}>
          Loading Repositories...
        </Text>
      </View>
    );
  }
}
