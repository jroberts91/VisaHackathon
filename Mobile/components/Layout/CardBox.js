import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { baseUrl } from '../utils/baseUrl';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    backgroundColor: 'white',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
  },
  productName: { marginLeft: 10, fontWeight: 'bold', fontSize: 20 },
  productDetails: { marginLeft: 10 },
  contentBody: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  contentHeader: {
    margin: 10,
    flexDirection: 'row',
  },
  rightHeader: {},
  buttonStyle: {
    backgroundColor: '#F38801',
  },
  details: { textAlign: 'right' },
});

//<Button buttonStyle={styles.buttonStyle} title="Delete Item" />;

const ContentBody = (props) => {
  return (
    <View style={styles.contentBody}>
      <Text style={styles.details}>${props.price}</Text>
      <Button
        buttonStyle={styles.buttonStyle}
        title="Remove"
        onPress={() => {
          AsyncStorage.removeItem(props.id).then(() => {
            props.removeProduct(props.id);
          });
        }}
      />
    </View>
  );
};

const ContentHeader = (props) => {
  return (
    <View style={styles.contentHeader}>
      <Image style={styles.avatar} source={{ uri: `${baseUrl}${props.imageUrl}` }} />
      <View style={styles.rightHeader}>
        <Text style={styles.productName}> {props.productName} </Text>
        <Text style={styles.productDetails}> Qty: {props.qty} </Text>
        <Text style={styles.productDetails}> Price per item: ${props.price}</Text>
      </View>
    </View>
  );
};

export default class CardBox extends React.Component {
  render() {
    const { item, removeProduct } = this.props;
    const { product, qty } = item;
    const totalPrice = product.price * qty;
    return (
      <View elevation={2} style={styles.card}>
        <ContentHeader
          productName={product.name}
          imageUrl={product.images[0]}
          qty={qty}
          price={product.price.toFixed(2)}
        />
        <ContentBody price={totalPrice.toFixed(2)} id={product._id} removeProduct={removeProduct} />
      </View>
    );
  }
}
