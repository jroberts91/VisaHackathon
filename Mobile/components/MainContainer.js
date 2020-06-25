import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBar from './TopComponents/TopBar';
import HomePage from './Pages/Home/HomePage';
import ScanPage from './Pages/Scan/ScanPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import PaymentPage from './Pages/Payment/PaymentPage';

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
        {pageName === 'Home' && <HomePage />}
        {pageName === 'Profile' && <PaymentPage />}
        {pageName === 'Scan' && <ScanPage />}
        {pageName === 'Payment' && <PaymentPage />}
      </View>
    );
  }
}
