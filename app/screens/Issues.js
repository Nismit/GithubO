import React, { Component } from 'react'
import { ScrollView, View, } from 'react-native'
import IssueCard from '../components/IssueCard'

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
            })
            //console.log(this.state.issues);
          } else {
            this.setState({
              pulls: responseData,
            })
            //console.log(this.state.pulls);
          }

        })
        .done()
  }

  render() {
    return (
      <ScrollView>
        { this.props.navigation.state.params.issues.map(( issue ) => (
          <IssueCard
            key={issue.id}
            { ...issue }
            />
        ))}
      </ScrollView>
    )
  }
}
