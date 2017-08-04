import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Loader from '../components/Loader/Loader';

const styles = StyleSheet.create({
  codeView: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default class Code extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getCode();
  }

  getCode() {
    return fetch(this.props.navigation.state.params.url)
      .then(response => response.text())
      .then(responseText => {
        this.setState({
          content: responseText,
          loaded: true,
        });
      });
  }

  props: {
    navigation: Object,
  };

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <View style={styles.codeView}>
          <Text>{this.state.content}</Text>
        </View>
      </ScrollView>
    );
  }
}
