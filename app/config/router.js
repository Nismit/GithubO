import { StackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import Detail from '../screens/Detail';
import Issues from '../screens/Issues';
import Webview from '../screens/Webview';

export default StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Repository List',
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: 'Detail',
    },
    // navigationOptions: ({ navigation }) => ({
    //   title: `${navigation.state.params.name}`,
    // }),
  },
  Issues: {
    screen: Issues,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.type === 'pull_request' ? 'Pull Request' : 'Issues',
    }),
  },
  Webview: {
    screen: Webview,
    navigationOptions: {
      title: 'WebView',
    },
  },
});
