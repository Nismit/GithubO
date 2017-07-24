import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
  listTitleDescription: {
    fontSize: 17,
  },
});

export default class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <ScrollView>
        <List style={styles.listContainer}>
          { this.props.navigation.state.params.issues.map((issue) => (
            <ListItem
              //containerStyle={styles.listItem}
              key={issue.id}
              titleStyle={styles.listTitle}
              title={issue.title}
              subtitle={'#' + issue.number + ' by '+ issue.user.login }
              hideChevron
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
