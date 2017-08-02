import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Repositories from '../repository/Repositories';
import Repository from '../repository/Repository';
import Issues from '../issues/Issues';
import IssueDetail from '../issues/IssueDetail';
import Code from '../codeview/index';
import Webview from '../webview/index';
import Settings from '../settings/index';

export const RepositoryStack = StackNavigator({
  Repositories: {
    screen: Repositories,
    navigationOptions: {
      title: 'Repository List',
    },
  },
  Repository: {
    screen: Repository,
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
      title: 'README',
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
  Repositories: {
    screen: RepositoryStack,
    navigationOptions: {
      tabBarLabel: 'Repositories',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="repo" type="octicon" size={28} color={tintColor} />,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="settings" type="SimpleLineIcons" size={33} color={tintColor} />,
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
