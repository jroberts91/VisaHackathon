import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import API, { baseUrl } from '../../utils/baseUrl';
import NumericInput from 'react-native-numeric-input';
import Logo from '../../../images/LogoNoTagLine.png';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buyButton: {
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalQuantity: {
    marginBottom: 15,
  },
  image: { width: 150, height: 150 },
});

export default class ProductModal extends React.Component {
  state = {
    product: null,
    purchaseQty: 1,
    isValidId: null,
  };

  componentDidMount() {
    // get product data from web back end
    API.get(`${baseUrl}api/product/get?id=${this.props.productId}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ product: res.data.product });
          this.setState({ isValidId: true });
        } else {
          this.setState({ isValidId: false });
        }
      })
      .catch(() => this.setState({ isValidId: false }));
  }

  render() {
    const { product, isValidId } = this.state;
    if (product == null && isValidId == null) {
      return null;
    }

    const { isShowProductModal, setIsShowProductModal, setClearLastScannedId } = this.props;

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isShowProductModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {isValidId === true ? (
                <>
                  <Image style={styles.image} source={{ uri: `${baseUrl}${product.images[0]}` }} />
                  <Text style={styles.modalTitle}>{product.name}</Text>
                  <Text style={styles.modalText}>{product.description}</Text>
                  <Text style={styles.modalText}>{`$${product.price}`}</Text>
                  <NumericInput
                    containerStyle={styles.modalQuantity}
                    value={this.state.purchaseQty}
                    totalHeight={30}
                    totalWidth={100}
                    iconSize={10}
                    onChange={(value) => this.setState({ purchaseQty: value })}
                  />
                  <TouchableHighlight
                    style={{ ...styles.buyButton, backgroundColor: '#00276A' }}
                    onPress={() => {
                      // TODO: add product to cart
                    }}
                  >
                    <Text style={styles.textStyle}>Add To Cart</Text>
                  </TouchableHighlight>
                </>
              ) : (
                // invalid qr code
                <Text style={styles.modalTitle}>Invalid QR Code</Text>
              )}
              <TouchableHighlight
                style={{ ...styles.closeButton }}
                onPress={() => {
                  setIsShowProductModal(false);
                  setClearLastScannedId();
                }}
              >
                <Icon name="window-close" type="font-awesome-5" />
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
