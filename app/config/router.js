import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Detail from '../screens/Detail';
import Issues from '../screens/Issues';
import IssueDetail from '../screens/IssueDetail';
import Code from '../screens/Code';
import Webview from '../screens/Webview';
import Settings from '../screens/Settings';

export const FeedStack = StackNavigator({
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

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Repository',
      tabBarIcon: ({ tintColor }) => <Icon name="repo" type="octicon" size={28} color={tintColor} />,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" type="SimpleLineIcons" size={33} color={tintColor} />
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
