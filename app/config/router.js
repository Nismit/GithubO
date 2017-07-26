import { StackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import Detail from '../screens/Detail';
import Issues from '../screens/Issues';
import IssueDetail from '../screens/IssueDetail';
import Code from '../screens/Code';
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
  },
  Issues: {
    screen: Issues,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.type === 'pull_request' ? 'Pull Request' : 'Issues',
    }),
  },
  IssueDetail: {
    screen: IssueDetail,
    navigationOptions: {
      title: 'Detail',
    },
    // navigationOptions: ({ navigation }) => ({
    //   title: navigation.state.params.type === 'pull_request' ? 'Pull Request' : 'Issues',
    // }),
  },
  Code: {
    screen: Code,
    navigationOptions: {
      title: 'Code',
    },
  },
  Webview: {
    screen: Webview,
    navigationOptions: {
      title: 'WebView',
    },
  },
});
