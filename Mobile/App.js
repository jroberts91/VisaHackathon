import React from 'react';
import { StyleSheet } from 'react-native';
import MainTabs from './components/MainTabs';
import AppStart from './components/AppStart';
import { Provider, connect } from 'react-redux';
import store from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppStart />
      </Provider>
    );
  }
}
