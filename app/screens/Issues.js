import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Card, Icon, Button, } from 'react-native-elements';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';

export default class Issues extends Component {
  constructor( props ) {
    super( props )

    const collapsed  = {}
    this.props.navigation.state.params.issues.forEach((issue)=>collapsed[issue.id] = true)

    this.state = {
      loaded: false,
      collapsed: collapsed,
    }
  }

  componentDidMount() {

  }

  _handler(e) {
    console.log(e);
  }

  _toggleExpanded = (id) => {
    const newState = { collapsed: this.state.collapsed }
    newState.collapsed[id] = !this.state.collapsed[id]
    this.setState(newState)
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
                <Text style = { styles.issueTitle }>{ issue.title }</Text>
                <Text>{ issue.user.login } opened this issue.</Text>
              </View>

              <Collapsible collapsed = { this.state.collapsed[issue.id] }>
                <Text>{ issue.body }</Text>
              </Collapsible>

              <Button
                buttonStyle = { styles.buttonStyle }
                onPress = { ()=> this._toggleExpanded(issue.id) }
                title = { this.state.collapsed[issue.id] ? 'SHOW ISSUE' : 'HIDE ISSUE' }
              />
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
  },
  buttonStyle: {
    width: '100%',
    marginTop: 15,
  }
});
