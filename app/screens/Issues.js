import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';

export default class Issues extends Component {
  //const issues = [this.props.navigation.state.params]

  constructor( props ) {
    super( props )
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {

  }


  fetchData( URL, issueFlag ) {
    fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
          if( issueFlag === true ) {
            this.setState({
              issues: responseData,
            });
            //console.log(this.state.issues);
          } else {
            this.setState({
              pulls: responseData,
            });
            //console.log(this.state.pulls);
          }

        })
        .done();
  }

  render() {
    //console.log(issues);
    return (
      <Text>Test</Text>
    );
    // const { name,
    //   description,
    //   watchers_count,
    //   created_at,
    //   pushed_at,
    //   homepage,
    //   language,
    //   open_issues,
    //   stargazers_count,
    //   forks_count
    // } = this.props.navigation.state.params

    // let lastCommitTime = moment( pushed_at ).format('YYYY/MM/DD HH:mm')

    //const issues = this.props.navigation.state.params

    // return (
    //   <ScrollView>
    //     { issues.map(( issue ) => (
    //       <View style = { styles.container }>
    //         <Text style = { styles.sectionText }>{ issue.title }</Text>
    //       </View>
    //     ))}
    //   </ScrollView>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
  },
});
