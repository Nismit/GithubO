import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Grid, Col, Icon } from 'react-native-elements';
import moment from 'moment';

export default class Detail extends Component {
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
    } = this.props.navigation.state.params

    let lastCommitTime = moment( pushed_at ).format('YYYY/MM/DD HH:mm')

    // <Text>Repository: { name }{"\n"}
    // Created at: { created_at }{"\n"}
    // Last Commit at: { pushed_at }{"\n"}
    // Website: { homepage }{"\n"}
    // Stars: { stargazers_count }{"\n"}
    // Language: { language }{"\n"}
    // Fork Count: { forks_count }{"\n"}
    // Open Issues: { open_issues }{"\n"}
    // </Text>

    return (
      <ScrollView>
      <List style={styles.listContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>General</Text>
        </View>
        <ListItem
          title="Watch"
          rightTitle = { watchers_count !== 0 ? watchers_count.toString() : '0'  }
          hideChevron
        />
        <ListItem
          title="Star"
          rightTitle = { stargazers_count !== 0 ? stargazers_count.toString() : '0'  }
          hideChevron
        />
        <ListItem
          title="Fork"
          rightTitle = { forks_count !== 0 ? forks_count.toString() : '0'  }
          hideChevron
        />
        <ListItem
          title="Language"
          rightTitle = { language }
          hideChevron
        />
        <ListItem
          title="Last Commit"
          rightTitle = { lastCommitTime }
          hideChevron
        />
      </List>

        <List>
          <ListItem
            title="Issues"
            //rightTitle=
            badge={{ value: `${ open_issues !== 0 ? open_issues.toString() : '0'  }`, badgeTextStyle: { color: 'orange' }, badgeContainerStyle: { marginTop: -20 } }}
            hideChevron
          />
          <ListItem
            title="Pull requests"
            //rightTitle={  }
            hideChevron
          />
        </List>
      </ScrollView>
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
  listContainer: {
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  sectionText: {
    fontWeight: 'bold',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
  },
});
