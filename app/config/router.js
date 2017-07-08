import React from 'react';
import { StackNavigator } from 'react-navigation';

import Feed from '../screens/Feed';
import Detail from '../screens/Detail';

export const Nav = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Repository List',
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: `${ navigation.state.params.name }`,
    }),
  },
});
