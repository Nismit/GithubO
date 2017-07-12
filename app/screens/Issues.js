import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Card, Icon, Button, } from 'react-native-elements';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';

export default class Issues extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {

  }

  _handler(e) {
    console.log(e);
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
          <IssueCard
            key={issue.id}
            { ...issue }
            />
        ))}
      </ScrollView>
    );
  }
}

class IssueCard extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      collapsed: true
    }
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    return (
      <Card>
          <View>
            <Text style = { styles.issueTitle }>{ this.props.title }</Text>
            <Text>{ this.props.user.login } opened this issue.</Text>
          </View>

          <Collapsible collapsed = { this.state.collapsed }>
            <Text>{ this.props.body }</Text>
          </Collapsible>

          <Button
            buttonStyle = { styles.buttonStyle }
            onPress = { ()=> this._toggleExpanded() }
            title = { this.state.collapsed ? 'SHOW ISSUE' : 'HIDE ISSUE' }
          />
      </Card>
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
  },
  buttonStyle: {
    width: '100%',
    marginTop: 15,
  }
});
