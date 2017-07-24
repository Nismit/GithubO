import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
// import IssueCard from '../components/IssueCard';

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingTop: 11,
    paddingBottom: 11,
  },
  listTitle: {
    fontSize: 16,
  },
  listIcon: {
    marginTop: 2,
    marginRight: 8,
    marginLeft: 6,
  },
});

export default class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pullRequest: this.props.navigation.state.params.type === 'pull_request',
      //this.props.navigation.state.params.issues.length > 0 && 'pull_request' in this.props.navigation.state.params.issues[0],
    };
  }

  componentDidMount() {

  }

  render() {
    const icon = this.state.pullRequest
    ? <Icon
      style={styles.listIcon}
      name="git-pull-request"
      type="octicon"
      color="#6f42c1" />
    : <Icon
      style={styles.listIcon}
      name="issue-opened"
      type="octicon"
      color="#FF3A3A" />;

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          { this.props.navigation.state.params.issues.map((issue) => (
            <ListItem
              containerStyle={styles.listItem}
              key={issue.id}
              leftIcon={icon}
              titleStyle={styles.listTitle}
              title={issue.title}
              subtitle={'#' + issue.number + ' by '+ issue.user.login}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
