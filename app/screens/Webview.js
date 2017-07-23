import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class Webview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }


  render() {
    return (
      <WebView
        source={{ uri: 'https://github.com/facebook/react-native' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
