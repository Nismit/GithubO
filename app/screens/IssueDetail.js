import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ListStyle from './styles';
import Loader from '../components/Loader/Loader';

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd2d9',
    backgroundColor: '#00052A',
  },
  sectionText: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#ffffff',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
  },
  listTitleDescription: {
    fontSize: 17,
  },
  iconBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRightWidth: 0.8,
    borderRightColor: '#cbd2d9',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd2d9',
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconBoxLast: {
    borderRightWidth: 0,
  },
  icon: {
    width: 20,
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
  },
});

const htmlStyles = StyleSheet.create({
  h2: {
    fontSize: 20,
    margin: 0,
    marginBottom: 0,
    padding: 0,
  },
  p: {
    margin: 0,
    marginBottom: 0,
    padding: 0,
  },
  ul: {
    margin: 5,
    marginBottom: 0,
    padding: 0,
  },
  li: {
    margin: 5,
    padding: 0,
  },
  hr: {
    margin: 0,
    padding: 0,
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
