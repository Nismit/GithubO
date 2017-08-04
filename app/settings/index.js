import React, { Component } from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ListStyle from '../utils/styles/lists';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('USER')
      .then(result => {
        if (result !== null) {
          this.setState({
            username: result,
          });
        }
      }).done();
  }

  toEditUsername = username => {
    if (username !== null) {
      const { navigation } = this.props;
      navigation.navigate('EditUsername', { username });
    }
  };

  render() {
    return (
      <ScrollView>
        <List style={ListStyle.listContainer}>
          <ListItem
            containerStyle={ListStyle.listItem}
            titleStyle={ListStyle.listTitle}
            title="Username"
            rightTitle={this.state.username}
            onPress={() => this.toEditUsername(this.state.username)}
          />
        </List>

        <List>
          <ListItem
            containerStyle={ListStyle.listItem}
            titleStyle={ListStyle.listTitle}
            title="Version"
            rightTitle="0.0.1"
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}
