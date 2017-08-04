import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ListStyle from '../utils/styles/lists';
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

export default class Repository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: [],
      pulls: [],
      data: [],
      contents: [],
      branches: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getRepository();
  }

  getRepository() {
    return fetch(this.props.navigation.state.params.repoURL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData,
        });
        this.getIssues();
      })
      .then(() => {
        fetch(this.state.data.branches_url.replace(/\{\/branch\}/, ''))
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              branches: responseData,
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
      .then(responseData => {
        this.setState({
          issues: responseData.filter(d => !('pull_request' in d)),
          pulls: responseData.filter(d => 'pull_request' in d),
        });
      })
      .done();
  }

  props: {
    navigation: Object,
  }

  // memo https://react-native-training.github.io/react-native-elements/API/lists/

  showIssues() {
    this.props.navigation.navigate('Issues', { issues: this.state.issues, type: 'issue' });
  }

  showPR() {
    this.props.navigation.navigate('Issues', { issues: this.state.pulls, type: 'pull_request' });
  }

  showContents(url, branch) {
    this.props.navigation.navigate('Contents', { contentsURL: url, branch });
  }

  showCode(url) {
    this.props.navigation.navigate('Code', { url });
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
      language,
      default_branch,
      stargazers_count,
      forks_count,
      subscribers_count,
    } = this.state.data;

    const contents_url = this.state.data.contents_url.replace(/\/\{\+path\}/, '');

    return (
      <ScrollView>
        <List style={ListStyle.listContainer}>
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
            containerStyle={ListStyle.listItem}
            titleStyle={[ListStyle.listTitle, styles.listTitleDescription]}
            title={
              <View><Text>{description !== null ? description : 'No Description'}</Text></View>
            }
            hideChevron
          />
          <ListItem
            containerStyle={ListStyle.listItem}
            titleStyle={ListStyle.listTitle}
            title="README"
            onPress={() => this.openWebView(this.props.navigation.state.params.repoURL + '/readme')}
            // Memo https://api.github.com/repos/roots/sage/readme
          />
        </List>

        <List>
          <ListItem
            containerStyle={ListStyle.listItem}
            leftIcon={
              <Icon
                style={ListStyle.listIcon}
                name="issue-opened"
                type="octicon"
                color="#FF3A3A"
              />
            }
            titleStyle={ListStyle.listTitle}
            title="Issues"
            badge={{ value: `${this.state.issues.length !== 0 ? this.state.issues.length.toString() : '0'}`, containerStyle: { marginTop: 3.5 } }}
            // hideChevron
            onPress={() => this.showIssues()}
          />
          <ListItem
            containerStyle={ListStyle.listItem}
            leftIcon={
              <Icon
                style={ListStyle.listIcon}
                name="git-pull-request"
                type="octicon"
                color="#6f42c1"
              />
            }
            titleStyle={ListStyle.listTitle}
            title="Pull Requests"
            badge={{ value: `${this.state.pulls.length !== 0 ? this.state.pulls.length.toString() : '0'}`, containerStyle: { marginTop: 3.5 } }}
            // hideChevron
            onPress={() => this.showPR()}
          />
        </List>

        <List>
          { this.state.branches.map(branch => (
            <ListItem
              containerStyle={ListStyle.listItem}
              titleStyle={ListStyle.listTitle}
              title={branch.name}
              key={branch.commit.sha}
              onPress={() => this.showContents(contents_url, branch.name)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
