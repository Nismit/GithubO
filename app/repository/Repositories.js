import React, { Component } from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Loader from '../components/Loader/Loader';
import ListStyle from '../utils/styles/lists';
import { REPO } from '../api/index';

// const API_URL = 'https://api.github.com/users/Nismit/repos?sort=pushed';
// const API_URL = 'https://api.github.com/users/roots/repos?sort=pushed';
const pushed = '?sort=pushed';

export default class Repositories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      loaded: false,
    };
  }

  componentDidMount() {
    let API_URL = '';

    AsyncStorage.getItem('USER')
      .then(result => {
        if (result !== null) {
          API_URL = REPO(result);
          this.getRepositories(`${API_URL}${pushed}`);
        } else {
          // console.log('First time to launched');
        }
      }).done();
  }

  getRepositories = url => {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          repositories: responseData,
          loaded: true,
        });
      }).done();
  }

  props: {
    navigation: Object,
  };

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
