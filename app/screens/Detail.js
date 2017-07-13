import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor: '#00052A',
  },
  sectionText: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#ffffff',
  },
  listContainer: {
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  listTitle: {
    fontSize: 15,
  },
});

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      pulls: [],
      loaded: false,
    };
  }

  componentDidMount() {
    const { issues_url } = this.props.navigation.state.params;
    const ISSUES_URL = issues_url.replace(/{\/number}/, '');

    console.log(ISSUES_URL);

    // get issue dara from api
    this.fetchData(ISSUES_URL);
  }

  // memo https://react-native-training.github.io/react-native-elements/API/lists/

  dividedPullsFromIssues() {
    for (var issue of this.state.issues) {
      // console.log(issue.includes('pull_request'));
    }
  }

  fetchData(URL) {
    fetch(URL)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          issues: responseData,
        });
        this.dividedPullsFromIssues();
      })
      .done();
  }

  showIssues(issues) {
    this.props.navigation.navigate('Issues', { issues: issues });
  }

  render() {
    const { name,
      description,
      watchers_count,
      created_at,
      pushed_at,
      homepage,
      language,
      open_issues,
      stargazers_count,
      forks_count
    } = this.props.navigation.state.params;

    const lastCommitTime = moment(pushed_at).format('YYYY/MM/DD HH:mm');

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>General</Text>
          </View>
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Watch"
            rightTitle={watchers_count !== 0 ? watchers_count.toString() : '0'}
            hideChevron
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Star"
            rightTitle={stargazers_count !== 0 ? stargazers_count.toString() : '0'}
            hideChevron
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Fork"
            rightTitle={forks_count !== 0 ? forks_count.toString() : '0'}
            hideChevron
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Language"
            rightTitle={language}
            hideChevron
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Last Commit"
            rightTitle={lastCommitTime}
            hideChevron
          />
        </List>

          <List>
            <ListItem
              containerStyle={styles.listItem}
              titleStyle={styles.listTitle}
              title="Issues"
              badge={{ value: `${this.state.issues.length !== 0 ? this.state.issues.length.toString() : '0'}`, badgeTextStyle: { color: 'orange' }, badgeContainerStyle: { marginTop: -20 } }}
              // hideChevron
              onPress={() => this.showIssues(this.state.issues)}
            />
            <ListItem
              containerStyle={styles.listItem}
              titleStyle={styles.listTitle}
              title="Pull requests"
              badge={{ value: `${this.state.pulls.length !== 0 ? this.state.issues.length.toString() : '0'}`, badgeTextStyle: { color: 'orange' }, badgeContainerStyle: { marginTop: -20 } }}
              // hideChevron
              onPress={() => this.showIssues(this.state.pulls)}
            />
          </List>
      </ScrollView>
    );
  }
}
