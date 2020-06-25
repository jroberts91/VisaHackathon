import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import API, { baseUrl } from '../../utils/baseUrl';
import NumericInput from 'react-native-numeric-input';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paymentHeader: {
    position: 'absolute',
    top: '10%',
    textAlign: 'center',
    width: '80%',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    borderRadius: 10,
    backgroundColor: '#1a1f71',
    paddingVertical: 10
  },
  cardInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  tinyLogo: {
    height: 36,
    width: 48
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
    margin: 0
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 15
  },
  payButton: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-end'
  }
});

export default class PaymentPage extends React.Component {
  state = {
    cardNumber: null,
    expiryDate: null,
    cvv: null,
  };

  componentDidMount() { }

  sendPayment() {

  }

  render() {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.paymentHeader}>Total Amount: $5.00</Text>
        <Input
          inputContainerStyle={styles.cardInput}
          label='Card Number'
          placeholder='0000-0000-0000-0000'
          onChangeText={value => this.setState({ cardNumber: value })}
          errorStyle={{ color: 'red' }}
          errorMessage=''
          leftIcon={
            <Icon
              name='credit-card'
              size={24}
            />
          }
          rightIcon={
            <Image 
            style={styles.tinyLogo}  
            source={require('../../../images/visa-logo.png') } />
          }
        />
        <View style={styles.cardContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.expiryInput}
            label='Expires'
            placeholder='MM/YY'
            onChangeText={value => this.setState({ expiryDate: value })}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.cvvInput}
            label='CVV'
            placeholder='000'
            onChangeText={value => this.setState({ cvv: value })}
          />
        </View>
        <View style={styles.payButton}>
        <Button 
          raised='true'
          color='#1a1f71'
          title="Pay with Visa"
          onPress={() => this.sendPayment()}
        />
        </View>
      </View>
    );
  }
}
