import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Grid, Col, Icon } from 'react-native-elements';
import moment from 'moment';

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
  listContainer: {
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingTop: 13,
    paddingBottom: 13,
  },
  listTitle: {
    fontSize: 15,
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

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.getRepository();
    this.state = {
      issues: [],
      pulls: [],
      data: [],
      contents: [],
      loaded: false,
    };
  }

  componentDidMount() {
    // const { issues_url } = this.props.navigation.state.params;
    // const ISSUES_URL = issues_url.replace(/{\/number}/, '');
    //
    // // get issue dara from api
    // // this.fetchData(ISSUES_URL);
    //
    // return fetch(ISSUES_URL)
    //   .then(response => response.json())
    //   .then((responseData) => {
    //     const resIssues = [];
    //     const resPulls = [];
    //     for (const issue of responseData) {
    //       if ('pull_request' in issue) {
    //         resPulls.push(issue);
    //       } else {
    //         resIssues.push(issue);
    //       }
    //     }
    //     this.setState({
    //       issues: resIssues,
    //       pulls: resPulls,
    //     });
    //   })
    //   .done();
  }

  getRepository() {
    return fetch(this.props.navigation.state.params.repoURL)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
        });
      })
      .then(() => {
        fetch(this.state.data.contents_url.replace(/\{\+path\}/, ''))
          .then(response => response.json())
          .then((responseData) => {
            this.setState({
              contents: responseData,
              loaded: true,
            });
            console.log(this.state.contents);
        }).done();
      }).done();
  }

  // memo https://react-native-training.github.io/react-native-elements/API/lists/

  showIssues(issues) {
    //this.props.navigation.navigate('Issues', { issues: issues });
  }

  renderLoadingView() {
    return (
      <View style={styles.loadContainer}>
        <Text style={styles.loadText}>
          Loading Repository...
        </Text>
      </View>
    );
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return this.renderLoadingView();
    }

    const { name,
      description,
      pushed_at,
      homepage,
      language,
      open_issues,
      default_branch,
      stargazers_count,
      forks_count,
      subscribers_count
    } = this.state.data;

    const lastCommitTime = moment(pushed_at).format('YYYY/MM/DD HH:mm');

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>General</Text>
          </View>
          <Grid>
            <Col style={styles.iconBox}>
              <Icon
              style={styles.icon}
              name='eye'
              type='font-awesome'
              size={16}
              color='#24292e' />
              <Text style={styles.iconText}>{subscribers_count !== 0 ? subscribers_count.toString() : '0'}</Text>
            </Col>
            <Col style={styles.iconBox}>
              <Icon
              style={styles.icon}
              name='star'
              type='font-awesome'
              size={16}
              color='#24292e' />
              <Text style={styles.iconText}>{stargazers_count !== 0 ? stargazers_count.toString() : '0'}</Text>
            </Col>
            <Col style={[styles.iconBox, styles.iconBoxLast]}>
              <Icon
              style={styles.icon}
              name='repo-forked'
              type='octicon'
              size={16}
              color='#24292e' />
              <Text style={styles.iconText}>{forks_count !== 0 ? forks_count.toString() : '0'}</Text>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.iconBox}>
              <Icon
              style={styles.icon}
              name='git-branch'
              type='octicon'
              size={16}
              color='#24292e' />
              <Text style={styles.iconText}>{default_branch}</Text>
            </Col>
            <Col style={[styles.iconBox, styles.iconBoxLast]}>
              <Icon
              style={styles.icon}
              name='code'
              type='font-awesome'
              size={16}
              color='#24292e' />
              <Text style={styles.iconText}>{language}</Text>
            </Col>
          </Grid>
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={[styles.listTitle, styles.listTitleDescription]}
            title={
              <View><Text>{description !== null ? description : 'No Description'}</Text></View>
            }
            //rightTitle={lastCommitTime}
            hideChevron
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="README"
            //rightTitle={lastCommitTime}
            // Memo https://api.github.com/repos/roots/sage/readme
          />
        </List>

        <List>
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Issues"
            badge={{ value: `${this.state.issues.length !== 0 ? this.state.issues.length.toString() : '0'}`, containerStyle: { marginTop: 3 } }}
            // hideChevron
            onPress={() => this.showIssues(this.state.issues)}
          />
          <ListItem
            containerStyle={styles.listItem}
            titleStyle={styles.listTitle}
            title="Pull requests"
            badge={{ value: `${this.state.pulls.length !== 0 ? this.state.pulls.length.toString() : '0'}`, containerStyle: { marginTop: 3 } }}
            // hideChevron
            onPress={() => this.showIssues(this.state.pulls)}
          />
        </List>

        <List>
          { this.state.contents.map((content) => (
            <ListItem
              containerStyle={styles.listItem}
              titleStyle={styles.listTitle}
              key={content.sha}
              title={content.name}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
