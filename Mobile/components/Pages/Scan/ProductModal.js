import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import API, { baseUrl } from '../../utils/baseUrl';
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: { width: 50, height: 50 },
});

export default class ProductModal extends React.Component {
  state = {
    product: null,
  };

  componentDidMount() {
    // get product data from web back end
    API.get(`${baseUrl}api/product/get?id=${this.props.productId}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ product: res.data.product });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { product } = this.state;
    if (product == null) {
      return null;
    }
    console.log(product);
    const { isShowProductModal, setIsShowProductModal } = this.props;
    const imageUrl = product.images[0].replace('_', '-');
    console.log(`${baseUrl}${imageUrl}`);
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
              <Text style={styles.modalText}>{product.name}</Text>
              <Image style={styles.image} source={{ uri: `${baseUrl}${product.images[0]}` }} />
              <Text style={styles.modalText}>{product.description}</Text>
              <Text style={styles.modalText}>{product.price}</Text>
              <Text style={styles.modalText}>{`${baseUrl}${imageUrl}`}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#00276A' }}
                onPress={() => {
                  setIsShowProductModal(false);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
