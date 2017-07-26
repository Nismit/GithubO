import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ListStyle from './styles';
import Loader from '../components/Loader/Loader';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'row',
  },
  iconBox: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    width: 10,
  },
  iconText: {
    fontSize: 16,
    paddingRight: 10,
  },
});

export default class IssueDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainBody: '',
      loaded: false,
    };
  }

  componentDidMount() {
  }

  fetchData() {
    fetch('https://api.github.com/markdown', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/html',
      },
      body: JSON.stringify({
        text: this.props.navigation.state.params.issue.body,
        mode: 'gfm',
      }),
    })
    .then((response) => response.text())
    .then((responseText) => {
      this.setState({
        mainBody: responseText,
        loaded: true,
      });
    });
  }

  // memo https://react-native-training.github.io/react-native-elements/API/lists/

  render() {
    const icon = this.state.pullRequest
    ? <Icon
      style={ListStyle.listIcon}
      name="git-pull-request"
      type="octicon"
      color="#6f42c1" />
    : <Icon
      style={ListStyle.listIcon}
      name="issue-opened"
      type="octicon"
      color="#FF3A3A" />;

    return (
      <ScrollView>
        <View style={styles.flex}>
          <View style={styles.iconBox}>
            {icon}
            <Text style={styles.iconText}>{this.props.navigation.state.params.issue.title}</Text>
          </View>
        </View>
        <List style={ListStyle.listContainer}>
          <ListItem
            containerStyle={ListStyle.listItem}
            titleStyle={[ListStyle.listTitle, styles.listTitleDescription]}
            title="test"
            onPress={() => this.fetchData()}
          />
          <View><Text>{this.props.navigation.state.params.issue.body}</Text></View>
        </List>
      </ScrollView>
    );
  }
}
