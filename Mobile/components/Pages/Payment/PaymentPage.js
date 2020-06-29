import React from 'react';
import { StyleSheet, Text, View, Button, Image, Keyboard } from 'react-native';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import API from '../../utils/baseUrl';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentHeader: {
    bottom: '10%',
    textAlign: 'center',
    width: '80%',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    borderRadius: 10,
    backgroundColor: '#1a1f71',
    paddingVertical: 10,
  },
  cardInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  tinyLogo: {
    height: 36,
    width: 48,
  },
  inputContainer: {
    width: '30%',
  },
  expiryInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  cvvInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '80%',
    margin: 0,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 15,
  },
  payButton: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default class PaymentPage extends React.Component {
  state = {
    products: null,
    cardNumber: null,
    expiryDate: null,
    cvv: null,
    keyboardUp: false,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.getAllProductsInCart();
  }

  getAllProductsInCart = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const addedProducts = result.map((req) => JSON.parse(req[1]));
    this.setState({ products: addedProducts });
  };

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardUp: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardUp: false,
    });
  };

  sendPayment() {
    const { products, cvv, cardNumber, expiryDate } = this.state;
    const merchantId = products[0].product.merchantId;
    const formattedCart = products.map((product) => {  
      return {
        quantity: product.qty,
        productId: product.product._id,
      };
    });
    const body = {
      cart: formattedCart,
      merchantId: merchantId,
      cvv: cvv,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
    };
    API.post('/api/payment/mobile', body).then((res) => {
      if (res.data.success) {
        // clear local storage since paid successful
        AsyncStorage.clear()
          .then(() => 
          this.props.navigation.navigate('Cart', { paymentSuccess: true })) 
      }
    });
  }

  attemptPayment() {
    const { cardNumber, expiryDate, cvv } = this.state;
    if (cardNumber === null) {
      this.setState({ cardNumber: '' });
    }
    if (expiryDate === null) {
      this.setState({ expiryDate: '' });
    }
    if (cvv === null) {
      this.setState({ cvv: '' });
    }
    if (
      cardNumber !== '' &&
      cardNumber !== null &&
      expiryDate !== '' &&
      expiryDate !== null &&
      cvv !== '' &&
      cvv !== null
    ) {
      this.captchaForm.show();
    }
  }

  onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expire'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
        return;
      } else {
        this.sendPayment();
        setTimeout(() => {
          this.captchaForm.hide();
        }, 5000);
      }
    }
  };

  getCardErrorMsg(field) {
    if (field === '') {
      return 'This field cannot be left empty';
    }
    return '';
  }

  render() {
    const { products } = this.state;
    if (products == null) {
      return null;
    }
    const totalPrice = products.reduce((acc, product) => {
      acc += product.product.price * product.qty;
      return acc;
    }, 0);
    return (
      <View style={styles.centeredView}>
        <Text style={styles.paymentHeader}>Total Amount: ${totalPrice.toFixed(2)}</Text>
        <Input
          inputContainerStyle={styles.cardInput}
          label="Card Number"
          placeholder="0000-0000-0000-0000"
          onChangeText={(value) => this.setState({ cardNumber: value })}
          errorStyle={{ color: 'red' }}
          errorMessage={this.getCardErrorMsg(this.state.cardNumber)}
          leftIcon={<Icon name="credit-card" size={24} />}
          rightIcon={<Image style={styles.tinyLogo} source={require('../../../images/visa-logo.png')} />}
        />
        <View style={styles.cardContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.expiryInput}
            label="Expires"
            placeholder="MM/YY"
            onChangeText={(value) => this.setState({ expiryDate: value })}
            errorStyle={{ color: 'red' }}
            errorMessage={this.getCardErrorMsg(this.state.expiryDate)}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.cvvInput}
            label="CVV"
            placeholder="000"
            onChangeText={(value) => this.setState({ cvv: value })}
            errorStyle={{ color: 'red' }}
            errorMessage={this.getCardErrorMsg(this.state.cvv)}
          />
        </View>
        <ConfirmGoogleCaptcha
          ref={(_ref) => (this.captchaForm = _ref)}
          siteKey={'6Lc_EqoZAAAAAGAzCKHzo2bEWXIvnMtETb9blmyq'}
          baseUrl={'exp://192.168.0.188:19000'}
          languageCode="en"
          onMessage={this.onMessage}
        />
        <View style={styles.payButton}>
          <Button raised="true" color="#1a1f71" title="Pay with Visa" onPress={() => this.attemptPayment()} />
        </View>
      </View>
    );
  }
}