import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import API, { baseUrl } from '../../utils/baseUrl';
import NumericInput from 'react-native-numeric-input';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  paymentHeader: {
    position: 'absolute',
    top: '10%',
    textAlign: 'center',
    width: '100%',
    fontSize: 24,
    fontWeight: '600'
  },
  cardInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5
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
  }
});

export default class PaymentPage extends React.Component {
  state = {
    cardNumber: null,
    expiryDate: null,
    cvv: null
  };

  componentDidMount() { }

  checkNumber(value) {
    console.log(value)
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.paymentHeader}>Total Amount: $5.00</Text>
        <Input
          inputContainerStyle={styles.cardInput}
          label='Card Number'
          placeholder='0000-0000-0000-0000'
          onChangeText={value => this.checkNumber(value)}
          errorStyle={{ color: 'red', display: 'none' }}
          errorMessage='ENTER A VALID ERROR HERE'
          leftIcon={
            <Icon
              name='credit-card'
              size={24}
            />
          }
        />
        <View style={styles.cardContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.expiryInput}
            label='Expires'
            placeholder='MM/YY'
          />
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.cvvInput}
            label='CVV'
            placeholder='000'
          />
        </View>
      </View>
    );
  }
}
