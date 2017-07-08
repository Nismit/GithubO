import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import {
  List,
  ListItem,
} from 'react-native-elements';

const API_URL = 'https://api.github.com/users/Nismit/repos?sort=pushed';

export default class Feed extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      //dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      repositories: [],
      loaded: false,
    };
    // this.state = {
    //   dataSource: [],
    // };
  }

  showDetail = ( repository ) => {
    this.props.navigation.navigate('Detail', { ...repository });
  };

  componentDidMount() {
    this.fetchData();
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
    if ( !load ) {
      return this.renderLoadingView();
    }

    return (
      <ScrollView>
        <List style={styles.listContainer}>
          { this.state.repositories.map(( repository ) => (
            <ListItem
              key={ repository.id }
              title={ repository.name }
              onPress={() => this.showDetail( repository )}
            />
          ))}
        </List>
      </ScrollView>
    );
  }

  fetchData() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
              //dataSource: this.state.dataSource.cloneWithRows(responseData),
              repositories: responseData,
              loaded: true,
            });
        })
        .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    //paddingTop: 22,
  },
  loadText: {
    fontSize: 22,
  },
  listContainer: {
    marginTop: 0,
  },
  item: {
    padding: 18,
    //fontSize: 18,
    //height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  }
});
