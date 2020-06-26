import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, LayoutAnimation, StatusBar, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductPage from './ProductPage';

class ScanPage extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedId: null,
    cameraType: BarCodeScanner.Constants.Type.back,
    isShowProductPage: false,
  };

  setIsShowProductPage = (visible) => {
    this.setState({ isShowProductPage: visible });
  };

  setClearLastScannedId = () => {
    this.setState({ lastScannedId: null });
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType: cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
    });
  };

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = (result) => {
    if (result.data !== this.state.lastScannedId) {
      LayoutAnimation.spring();
      // for some reason, if scanning an invalid qr code, displaying it will show the url, but
      // calling this.setState({ lastScannedId: result.data }); will set lastScannedId to null
      this.setState({ lastScannedId: result.data });
      this.setState({ isShowProductPage: true });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
        ) : this.state.isShowProductPage ? (
          <ProductPage
            isShowProductPage={this.state.isShowProductPage}
            setisShowProductPage={this.setIsShowProductPage}
            setClearLastScannedId={this.setClearLastScannedId}
            productId={this.state.lastScannedId}
          />
        ) : (
          <BarCodeScanner onBarCodeScanned={this._handleBarCodeRead} style={styles.barCodeScanner} />
        )}
        <StatusBar hidden />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  barCodeScanner: {
    aspectRatio: 0.56,
  },
});

export default ScanPage;
