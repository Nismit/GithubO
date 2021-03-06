import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { resetNavigation } from '../utils/navigation/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeFont: {
    fontSize: 30,
    margin: 10,
  },
});

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    AsyncStorage.getItem('USER')
      .then(result => {
        if (result !== null) {
          resetNavigation('Tabs', navigation);
        } else {
          // console.log('First time to launched');
          resetNavigation('SetName', navigation);
        }
      }).done();
  }

  props: {
    navigation: Object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.largeFont}>GitHubO</Text>
        <Text>GitHub Client App</Text>
      </View>
    );
  }
}
