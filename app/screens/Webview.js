import React, { Component } from 'react';
import { WebView } from 'react-native';
import Loader from '../components/Loader/Loader';

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

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    return (
      <WebView
        source={{ uri: this.state.data.html_url }}
        style={{ marginTop: 0 }}
      />
    );
  }
}
