import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

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
    backgroundColor: '#FAA913',
  },
  details: { textAlign: 'right' },
});

const ContentBody = (props) => {
  return (
    <View style={styles.contentBody}>
      <Text style={styles.details}>$100</Text>
      <Button buttonStyle={styles.buttonStyle} title="Delete Item" />
    </View>
  );
};

const ContentHeader = (props) => {
  return (
    <View style={styles.contentHeader}>
      <Image style={styles.avatar} source={{ uri: props.imageUrl }} />
      <View style={styles.rightHeader}>
        <Text style={styles.productName}> {props.personName} </Text>
        <Text style={styles.productDetails}> Qty: 5 </Text>
      </View>
    </View>
  );
};

export default class CardBox extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View elevation={2} style={styles.card}>
        <ContentHeader personName={item.name} imageUrl={item.picture} />
        <ContentBody text={item.phone} />
      </View>
    );
  }
}
