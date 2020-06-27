import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import API, { baseUrl } from '../../utils/baseUrl';
import NumericInput from 'react-native-numeric-input';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
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
  productTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: 300,
    minWidth: 300,
    marginBottom: 10,
  },
  invalidTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 300,
    minWidth: 300,
  },
  productDescription: {
    marginBottom: 15,
    maxWidth: 300,
    minWidth: 300,
  },
  productPrice: {
    marginBottom: 15,
  },
  productQuantity: {
    marginBottom: 15,
  },
  image: { width: 200, height: 200 },
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

    const { setisShowProductPage, setClearLastScannedId } = this.props;
    const amountLeft = isValidId ? product.totalQty - product.soldQty : 0;
    return (
      <View style={styles.centeredView}>
        <TouchableHighlight
          style={{ ...styles.backButton }}
          onPress={() => {
            setisShowProductPage(false);
            setClearLastScannedId();
          }}
        >
          <Icon name="chevron-left" type="font-awesome-5" />
        </TouchableHighlight>
        {isValidId === true ? (
          <>
            <Image style={styles.image} source={{ uri: `${baseUrl}${product.images[0]}` }} />
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>{`$${product.price}`}</Text>
            <NumericInput
              containerStyle={styles.productQuantity}
              value={this.state.purchaseQty}
              totalHeight={30}
              totalWidth={100}
              iconSize={10}
              minValue={1}
              maxValue={amountLeft}
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
          <Text style={styles.invalidTitle}>Invalid QR Code</Text>
        )}
      </View>
    );
  }
}
