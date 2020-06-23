import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

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
  personName: {marginLeft: 10, fontWeight: 'bold'},
  contentBody: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  contentHeader: {
    margin: 10,
    flexDirection: 'row',
  },
});

const ContentBody = props => {
  return (
    <View style={styles.contentBody}>
      <Text>{props.text}</Text>
      <Button buttonStyle={styles.buttonStle} title="View Profile" />
    </View>
  );
};

const ContentHeader = props => {
  return (
    <View style={styles.contentHeader}>
      <Image style={styles.avatar} source={{uri: props.imageUrl}} />
      <Text style={styles.personName}> {props.personName} </Text>
    </View>
  );
};

export default class CardBox extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <View elevation={2} style={styles.card}>
        <ContentHeader personName={item.name} imageUrl={item.picture} />
        <ContentBody text={item.phone} />
      </View>
    );
  }
}
