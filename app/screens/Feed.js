import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const API_URL = 'https://api.github.com/users/Nismit/repos?sort=pushed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    fontSize: 22,
  },
  listContainer: {
    marginTop: 0,
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

  showDetail(repository) {
    this.props.navigation.navigate('Detail', { ...repository })
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

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadText}>
          Loading Repositories...
        </Text>
      </View>
    );
  }

  render() {
    let load = this.state.loaded;
    if (!load) {
      return this.renderLoadingView();
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
              onPress={() => this.showDetail(repository)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}
