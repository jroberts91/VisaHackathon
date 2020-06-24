import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, LayoutAnimation, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductModal from './ProductModal';

class ScanPage extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedId: null,
    cameraType: BarCodeScanner.Constants.Type.back,
    isShowProductModal: false,
  };

  setIsShowProductModal = (visible) => {
    this.setState({ isShowProductModal: visible });
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
      this.setState({ isShowProductModal: true });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={this._handleBarCodeRead}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />
        )}

        {this._maybeRenderProduct()}

        <StatusBar hidden />
      </View>
    );
  }

  _maybeRenderProduct = () => {
    if (!this.state.lastScannedId) {
      return;
    }

    return (
      <View>
        <ProductModal
          isShowProductModal={this.state.isShowProductModal}
          setIsShowProductModal={this.setIsShowProductModal}
          setClearLastScannedId={this.setClearLastScannedId}
          productId={this.state.lastScannedId}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

export default ScanPage;
