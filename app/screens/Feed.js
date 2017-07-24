import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Loader from '../components/Loader/Loader';

// const API_URL = 'https://api.github.com/users/Nismit/repos?sort=pushed';
const API_URL = 'https://api.github.com/users/roots/repos?sort=pushed';

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  listTitle: {
    fontSize: 15,
  },
});

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  showDetail(repoURL) {
    this.props.navigation.navigate('Detail', { repoURL });
  }

  fetchData() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          repositories: responseData,
          loaded: true,
        });
      })
      .done();
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          { this.state.repositories.map((repository) => (
            <ListItem
              containerStyle={styles.listItem}
              titleStyle={styles.listTitle}
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
