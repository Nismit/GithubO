import React, { Component } from 'react';
import { WebView, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    fontSize: 22,
  },
});

export default class Webview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    return fetch(this.props.navigation.state.params.url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
          loaded: true,
        });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text style={styles.loadText}>
          Loading...
        </Text>
      </View>
    );
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return this.renderLoadingView();
    }

    return (
      <WebView
        source={{ uri: this.state.data.html_url }}
        style={{ marginTop: 0 }}
      />
    );
  }
}
