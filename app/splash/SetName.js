import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, TextInput, Text, View } from 'react-native';
import { resetNavigation } from '../utils/navigation/index';
import { Button } from 'react-native-elements'

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
  textInput: {
    width: '85%',
    height: 40,
    padding: 4,
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default class SetName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      text: 'GitHub Username',
    };
  }

  // TODO get name and set name to data base
  // and then push to Tabs

  setActivation = () => {
    try {
      AsyncStorage.setItem('ACTIVE', '1');
      this.setState({
        isActive: true,
      });
    } catch (error) {
      // Error saving data
      this.setState({
        isActive: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          icon={{ name: 'cached' }}
          title="SUBMIT"
        />
      </View>
    );
  }
}
