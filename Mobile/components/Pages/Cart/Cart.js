import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import CardBox from '../../Layout/CardBox';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#D6DBDF',
  },
  header: {
    height: 45,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
  },
  shoppingCart: {
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scroll: {
    flex: 1,
  },
  buttonStyle: {
    height: 50,
    width: 150,
    marginRight: 10,
    backgroundColor: '#1a1f71',
    marginBottom: 10,
    marginTop: 10,
  },
  totalCost: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: null };
  }

  componentDidMount = () => {
    this.getAllAddedProducts();
  };

  getAllAddedProducts = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const addedProducts = result.map((req) => JSON.parse(req[1]));
    this.setState({ products: addedProducts });
  };

  removeProduct = (productId) => {
    const filteredProducts = this.state.products.filter((product) => product.product._id !== productId);
    this.setState({ products: filteredProducts });
  };

  header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.shoppingCart}>Shopping Cart</Text>
      </View>
    );
  };

  footer = (products) => {
    const totalPrice = products.reduce((acc, product) => {
      acc += product.product.price * product.qty;
      return acc;
    }, 0);
    return (
      <View style={styles.footer}>
        <Text style={styles.totalCost}>Total Cost: ${totalPrice.toFixed(2)}</Text>
        <Button
          buttonStyle={styles.buttonStyle}
          title="Payment"
          onPress={() => this.props.navigation.navigate('Payment')}
        />
      </View>
    );
  };

  render() {
    const { products } = this.state;
    const { users } = this.props;
    if (products == null) {
      // haven't finished loading from local storage
      return null;
    }

    // TODO: get navigation passed param and display success message

    return (
      <View style={styles.main}>
        <FlatList
          style={styles.scroll}
          data={products}
          renderItem={({ item }) => <CardBox item={item} removeProduct={this.removeProduct} />}
          ListHeaderComponent={this.header}
          ListFooterComponent={this.footer(products)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
