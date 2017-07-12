import React, { Component } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { Card, Icon, Button, } from 'react-native-elements'
import moment from 'moment'
import Collapsible from 'react-native-collapsible'

export default class IssueCard extends Component {
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
    )
  }
}

const styles = StyleSheet.create({
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: '100%',
    marginTop: 15,
  },
})
