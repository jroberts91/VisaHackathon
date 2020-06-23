import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBar from './TopComponents/TopBar';
import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default class MainContainer extends React.Component {
  render() {
    const { pageName, openDrawer, openMessage } = this.props.route.params;
    return (
      <View style={styles.main}>
        <TopBar openDrawer={openDrawer} openMessage={openMessage} />
        {pageName === 'Home' ? <HomePage /> : <ProfilePage personName={'John Does'} />}
      </View>
    );
  }
}