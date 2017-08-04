import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Splash from '../splash/Splash';
import SetName from '../splash/SetName';
import Repositories from '../repository/Repositories';
import Repository from '../repository/Repository';
import Contents from '../repository/Contents';
import Issues from '../issues/Issues';
import IssueDetail from '../issues/IssueDetail';
import Code from '../codeview/index';
import Webview from '../webview/index';
import Settings from '../settings/index';
import EditUsername from '../settings/edit';

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
  Contents: {
    screen: Contents,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.branch}`,
    }),
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
  EditUsername: {
    screen: EditUsername,
    navigationOptions: {
      title: 'Edit',
    },
  },
});

export const Tabs = TabNavigator({
  Repositories: {
    screen: RepositoryStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="repo" type="octicon" size={28} color={tintColor} />,
    },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="settings" type="SimpleLineIcons" size={33} color={tintColor} />,
    },
  },
},
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
    },
  });

export const Root = StackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
  SetName: {
    screen: SetName,
    navigationOptions: {
      header: null,
    },
  },
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
