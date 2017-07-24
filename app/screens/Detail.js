import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import Loader from '../components/Loader/Loader';
import moment from 'moment';

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd2d9',
    backgroundColor: '#00052A',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
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
    paddingTop: 11,
    paddingBottom: 11,
  },
  listTitle: {
    fontSize: 16,
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
  listIcon: {
    marginTop: 2,
    marginRight: 8,
    marginLeft: 6,
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

    this.state = {
      issues: [],
      pulls: [],
      data: [],
      contents: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getRepository();
  }

  getRepository() {
    return fetch(this.props.navigation.state.params.repoURL)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData,
        });
        this.getIssues();
      })
      .then(() => {
        fetch(this.state.data.contents_url.replace(/\{\+path\}/, ''))
          .then(response => response.json())
          .then((responseData) => {
            this.setState({
              contents: responseData,
              loaded: true,
            });
          })
        .done();
      })
      .done();
  }

  getIssues() {
    return fetch(this.state.data.issues_url.replace(/\{\/number\}/, ''))
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          issues: responseData.filter(d => !('pull_request' in d)),
          pulls: responseData.filter(d => 'pull_request' in d),
        });
      })
      .done();
  }

  // memo https://react-native-training.github.io/react-native-elements/API/lists/

  showIssues() {
    this.props.navigation.navigate('Issues', { issues: this.state.issues, type: 'issue' });
  }

  showPR() {
    this.props.navigation.navigate('Issues', { issues: this.state.pulls, type: 'pull_request' });
  }

  openWebView(url) {
    this.props.navigation.navigate('Webview', { url });
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    const { description,
      pushed_at,
      homepage,
      language,
      default_branch,
      stargazers_count,
      forks_count,
      subscribers_count,
    } = this.state.data;

    const lastCommitTime = moment(pushed_at).format('YYYY/MM/DD HH:mm');

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>General</Text>
          </View>
          <View style={styles.flex}>
            <View style={styles.iconBox}>
              <Icon
                style={styles.icon}
                name="eye"
                type="font-awesome"
                size={16}
                color="#24292e"
              />
              <Text style={styles.iconText}>{subscribers_count !== 0 ? subscribers_count.toString() : '0'}</Text>
            </View>
            <View style={styles.iconBox}>
              <Icon
                style={styles.icon}
                name="star"
                type="font-awesome"
                size={16}
                color="#24292e"
              />
              <Text style={styles.iconText}>{stargazers_count !== 0 ? stargazers_count.toString() : '0'}</Text>
            </View>
            <View style={[styles.iconBox, styles.iconBoxLast]}>
              <Icon
                style={styles.icon}
                name="repo-forked"
                type="octicon"
                size={16}
                color="#24292e"
              />
              <Text style={styles.iconText}>{forks_count !== 0 ? forks_count.toString() : '0'}</Text>
            </View>
          </View>
          <View style={styles.flex}>
            <View style={styles.iconBox}>
              <Icon
                style={styles.icon}
                name="git-branch"
                type="octicon"
                size={16}
                color="#24292e"
              />
              <Text style={styles.iconText}>{default_branch}</Text>
            </View>
            <View style={[styles.iconBox, styles.iconBoxLast]}>
              <Icon
                style={styles.icon}
                name="code"
                type="font-awesome"
                size={16}
                color="#24292e"
              />
              <Text style={styles.iconText}>{language}</Text>
            </View>
          </View>
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
            onPress={() => this.openWebView(this.props.navigation.state.params.repoURL + '/readme')}
            // Memo https://api.github.com/repos/roots/sage/readme
          />
        </List>

        <List>
          <ListItem
            containerStyle={styles.listItem}
            leftIcon={
              <Icon
                style={styles.listIcon}
                name="issue-opened"
                type="octicon"
                color="#FF3A3A"
              />
            }
            titleStyle={styles.listTitle}
            title="Issues"
            badge={{ value: `${this.state.issues.length !== 0 ? this.state.issues.length.toString() : '0'}`, containerStyle: { marginTop: 3.5 } }}
            // hideChevron
            onPress={() => this.showIssues()}
          />
          <ListItem
            containerStyle={styles.listItem}
            leftIcon={
              <Icon
                style={styles.listIcon}
                name="git-pull-request"
                type="octicon"
                color="#6f42c1"
              />
            }
            titleStyle={styles.listTitle}
            title="Pull requests"
            badge={{ value: `${this.state.pulls.length !== 0 ? this.state.pulls.length.toString() : '0'}`, containerStyle: { marginTop: 3.5 } }}
            // hideChevron
            onPress={() => this.showPR()}
          />
        </List>

        <List>
          { this.state.contents.map((content) => (
            <ListItem
              containerStyle={styles.listItem}
              titleStyle={styles.listTitle}
              key={content.sha}
              title={content.name}
              leftIcon={
                content.type === 'file' ?
                  <Icon
                    style={styles.listIcon}
                    name="file-text"
                    type="octicon"
                    color="rgba(3,47,98,0.5)"
                  />
                :
                  <Icon
                    style={styles.listIcon}
                    name="file-directory"
                    type="octicon"
                    color="rgba(3,47,98,0.5)"
                  />
              }
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
