import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Detail extends Component {
  render() {
    const { name, description,
      created_at,
      pushed_at,
      homepage,
      stargazers_count,
      language,
      forks_count,
      open_issues
    } = this.props.navigation.state.params;

    return (
      <Text>Repository: { name }{"\n"}
      Created at: { created_at }{"\n"}
      Last Commit at: { pushed_at }{"\n"}
      Website: { homepage }{"\n"}
      Stars: { stargazers_count }{"\n"}
      Language: { language }{"\n"}
      Fork Count: { forks_count }{"\n"}
      Open Issues: { open_issues }{"\n"}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    paddingTop: 22,
  },
});
