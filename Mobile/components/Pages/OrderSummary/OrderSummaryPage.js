import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import OrderSummaryCardBox from '../../Layout/OrderSummaryCardBox';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#D6DBDF',
  },
  header: {
    flex: 0.1,
    height: 45,
    marginTop: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  breadcrumbs: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  breadcrumbsSelected: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1a1f71',
  },
  footer: {
    flexDirection: 'row',
  },
  orderSummary: {
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  orderDate: {
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  scroll: {
    flex: 1,
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
    this.state = { order: null };
  }

  componentDidMount = () => {
    // get order summary from async storage
    this.getOrderSummary();
  };

  getOrderSummary = async () => {
    const rawOrder = await AsyncStorage.getItem('Order');
    const order = JSON.parse(rawOrder);
    this.setState({ order: order });
  };

  formatDate = (dateTime) => {
    let date = new Date(dateTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '  ' + strTime;
  };

  header = (date) => {
    const formattedDate = this.formatDate(date);
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.breadcrumbs}>{`Cart > Payment > `}</Text>
          <Text style={styles.breadcrumbsSelected}>Order Summary</Text>
        </View>
        <Text style={styles.orderDate}>{formattedDate}</Text>
      </>
    );
  };

  footer = (products) => {
    const totalPrice = products.reduce((acc, product) => {
      acc += product.product.price * product.qty;
      return acc;
    }, 0);
    return (
      <View style={styles.footer}>
        <Text style={styles.totalCost}>Total Paid: ${totalPrice.toFixed(2)}</Text>
      </View>
    );
  };

  render() {
    const { order } = this.state;
    if (order == null) {
      // haven't finished loading from local storage
      return null;
    }
    return (
      <View style={styles.main}>
        <FlatList
          style={styles.scroll}
          data={order.products}
          renderItem={({ item }) => <OrderSummaryCardBox item={item} />}
          ListHeaderComponent={this.header(order.date)}
          ListFooterComponent={this.footer(order.products)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
