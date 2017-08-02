import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Loader from '../components/Loader/Loader';
import ListStyle from '../utils/styles/lists';

// const API_URL = 'https://api.github.com/users/Nismit/repos?sort=pushed';
const API_URL = 'https://api.github.com/users/roots/repos?sort=pushed';

export default class Repositories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      loaded: false,
    };
  }

  componentDidMount() {
    return fetch(API_URL)
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          repositories: responseData,
          loaded: true,
        });
      }).done();
  }

  showDetail(repoURL) {
    this.props.navigation.navigate('Repository', { repoURL });
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <List style={ListStyle.listContainer}>
          { this.state.repositories.map(repository => (
            <ListItem
              containerStyle={ListStyle.listItem}
              titleStyle={ListStyle.listTitle}
              key={repository.id}
              title={repository.name}
              onPress={() => this.showDetail(repository.url)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
