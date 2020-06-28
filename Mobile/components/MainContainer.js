import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TopBar from './TopComponents/TopBar';
import ScanPage from './Pages/Scan/ScanPage';
import Cart from './Pages/Cart/Cart';
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
        {pageName === 'Cart' && <Cart navigation={this.props.navigation} />}
        {pageName === 'Scan' && <ScanPage />}
        {pageName === 'Payment' && <PaymentPage />}
      </View>
    );
  }
}
