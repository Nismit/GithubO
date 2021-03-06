import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import ListStyle from '../utils/styles/lists';
import Loader from '../components/Loader/Loader';

export default class Contents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: this.props.navigation.state.params.contentsURL,
      branch: this.props.navigation.state.params.branch,
      contents: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getContents();
  }

  getContents() {
    const base = this.state.base;
    const URL = `${base}?ref=${this.state.branch}`;

    return fetch(URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          contents: responseData,
          loaded: true,
        });
      }).done();
  }

  props: {
    navigation: Object,
  }

  showContents(url, branch) {
    this.props.navigation.navigate('Contents', { contentsURL: url, branch });
  }

  showCode(url) {
    this.props.navigation.navigate('Code', { url });
  }

  render() {
    const load = this.state.loaded;
    if (!load) {
      return <Loader />;
    }

    return (
      <ScrollView>
        <List style={ListStyle.listContainer}>
          { this.state.contents.map(content => (
            content.type === 'file' ?
              <ListItem
                containerStyle={ListStyle.listItem}
                titleStyle={ListStyle.listTitle}
                key={content.sha}
                title={content.name}
                onPress={() => this.showCode(content.download_url)}
                leftIcon={
                  <Icon
                    style={ListStyle.listIcon}
                    name="file-text"
                    type="octicon"
                    color="rgba(3,47,98,0.5)"
                  />
                }
              />
            :
              <ListItem
                containerStyle={ListStyle.listItem}
                titleStyle={ListStyle.listTitle}
                key={content.sha}
                title={content.name}
                leftIcon={
                  <Icon
                    style={ListStyle.listIcon}
                    name="file-directory"
                    type="octicon"
                    color="rgba(3,47,98,0.5)"
                  />
                }
                onPress={() => this.showContents(`${this.state.base}/${content.name}`, this.state.branch)}
              />
          ))}
        </List>
      </ScrollView>
    );
  }
}
