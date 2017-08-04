import React, { Component } from 'react';
import { KeyboardAvoidingView, AsyncStorage, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { resetNavigation } from '../utils/navigation/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F3C65',
  },
  largeFont: {
    fontSize: 30,
    margin: 10,
    color: '#fff',
  },
  textInput: {
    width: '85%',
    height: 40,
    padding: 4,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: '#fff',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#36D1DC',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default class SetName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: null,
    };
  }

  // TODO get name and set name to data base
  // and then push to Tabs

  setName = user => {
    const { navigation } = this.props;

    if (user !== null && user !== '') {
      try {
        AsyncStorage.setItem('USER', user);
        resetNavigation('Tabs', navigation);
      } catch (error) {
        // Error saving data
      }
    }
  };

  props: {
    navigation: Object,
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <TextInput
          style={styles.textInput}
          placeholder="GitHub Username"
          placeholderTextColor="#c8c8c8"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          buttonStyle={styles.submitButton}
          textStyle={styles.submitText}
          containerViewStyle={{ width: '85%' }}
          title="SUBMIT"
          onPress={() => this.setName(this.state.text)}
        />
      </KeyboardAvoidingView>
    );
  }
}
