import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';
import CardBox from '../../Layout/CardBox';
import { connect } from 'react-redux';
import API, { baseUrl } from '../../utils/baseUrl';

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

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount = () => {
    this.getAllProducts();
  };

  getAllProducts = () => {
    console.log(1);
    const body = {
      merchantId: '5ee9856ede9f8478c570d1ea',
    };
    API.post(`${baseUrl}api/product/getAll`, body)
      .then((res) => {
        console.log(res.data.products);
        if (res.data.success) {
          this.setState({ products: res.data.products });
        }
      })
      .catch(() => this.setState({ error: true }));
  };

  header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.shoppingCart}>Shopping Cart</Text>
      </View>
    );
  };

  footer = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.totalCost}>Total Cost: $500</Text>
        <Button buttonStyle={styles.buttonStyle} title="Payment" />
      </View>
    );
  };

  render() {
    const { products } = this.state;
    const { users } = this.props;
    return (
      <View style={styles.main}>
        <FlatList
          style={styles.scroll}
          data={products}
          renderItem={({ item }) => <CardBox item={item} />}
          ListHeaderComponent={this.header}
          ListFooterComponent={this.footer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Cart);
