import { StackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import Detail from '../screens/Detail';
import Issues from '../screens/Issues';

export default StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Repository List',
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
  Issues: {
    screen: Issues,
    navigationOptions: {
      title: 'Issues',
    },
    // navigationOptions: ({ navigation }) => ({
    //   title: 'Issues',
    // }),
  },
});
