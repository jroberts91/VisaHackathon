import React from 'react';
import { StyleSheet, Text, View, Button, Image, Keyboard } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
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
  innerView: {
    width: '100%'
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
  checkoutButton: {
    width: '70%',
    display: 'flex',
    marginTop: '15%'
  }
});

export default class PaymentPage extends React.Component {
  state = {
    products: null,
    cardNumber: null,
    expiryDate: null,
    cvv: null,
    keyboardUp: false,
    radioSelection: 0
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.getAllProductsInCart();
  }

  getAllProductsInCart = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const cartKeys = keys.filter((key) => key !== 'Order');
    const result = await AsyncStorage.multiGet(cartKeys);
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

  paymentVisaCheckout() {

  }

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
        const order = {
          date: Date.now(),
          products: products,
        };
        // clear local storage since paid successful
        AsyncStorage.clear().then(() => {
          // add current order
          AsyncStorage.setItem('Order', JSON.stringify(order));
          this.props.navigation.navigate('Order');
        });
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
      if (['cancel', 'error'].includes(event.nativeEvent.data)) {
        this.captchaForm.hide();
        return;
      } else {
        this.sendPayment();
      }
    }
  };

  getCardErrorMsg(field) {
    if (field === '') {
      return 'This field cannot be left empty';
    }
    return '';
  }

  getVisaDirectForm() {
    return (
      <View style={styles.innerView}>
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
    )
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

    if (totalPrice === 0) {
      return (
        <View style={styles.centeredView}>
          <Text>No item to Purchase</Text>
        </View>
      )
    }

    let radioProps = [
      { label: 'Visa Direct', value: 0 },
      { label: 'Visa Checkout', value: 1 }
    ]

    return (
      <View style={styles.centeredView}>
        <Text style={styles.paymentHeader}>Total Amount: ${totalPrice.toFixed(2)}</Text>
        <RadioForm
          formHorizontal={true}
          animation={true}
          initial={0}
        >
          {
            radioProps.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i} >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.radioSelection === i}
                  onPress={value => this.setState({ radioSelection: value })}
                  buttonInnerColor={'#FAA913'}
                  buttonOuterColor={'#FAA913'}
                  buttonWrapStyle={{ marginLeft: 10, paddingRight: 0 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  labelStyle={{ marginRight: 10 }}
                  onPress={() => {}}
                />
              </RadioButton>
            ))
          }
        </RadioForm>
        {
          this.state.radioSelection === 0 &&
          this.getVisaDirectForm()
        }
        {
          this.state.radioSelection === 1 &&
          <View style={styles.checkoutButton}>
              <Button raised="true" color="#1a1f71" title="Visa Checkout" onPress={() => this.paymentVisaCheckout()} />
          </View>
        }
      </View>
    );
  }
}
