import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import moment from 'moment';

export default class Issues extends Component {
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
    // let lastCommitTime = moment( pushed_at ).format('YYYY/MM/DD HH:mm')

    return (
      <ScrollView>
        { this.props.navigation.state.params.issues.map(( issue ) => (
          <Card key={issue.id}>
              <View>
                <Text style = { styles.issueTitle }>{issue.title}</Text>
                <Text>{issue.body}</Text>
              </View>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 22,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
