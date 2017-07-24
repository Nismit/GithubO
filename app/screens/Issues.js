import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ListStyle from './styles';

export default class Issues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pullRequest: this.props.navigation.state.params.type === 'pull_request',
    };
  }

  componentDidMount() {

  }

  render() {
    const icon = this.state.pullRequest
    ? <Icon
      style={ListStyle.listIcon}
      name="git-pull-request"
      type="octicon"
      color="#6f42c1" />
    : <Icon
      style={ListStyle.listIcon}
      name="issue-opened"
      type="octicon"
      color="#FF3A3A" />;

    return (
      <ScrollView>
        <List style={ListStyle.listContainer}>
          { this.props.navigation.state.params.issues.map((issue) => (
            <ListItem
              containerStyle={ListStyle.listItem}
              key={issue.id}
              leftIcon={icon}
              titleStyle={ListStyle.listTitle}
              title={issue.title}
              subtitle={'#' + issue.number + ' by '+ issue.user.login}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
