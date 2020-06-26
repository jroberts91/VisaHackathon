import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 0.5,
    marginLeft: 8,
    marginTop: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'white',
  },
  personName: { marginLeft: 10, fontWeight: 'bold' },
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

const ContentBody = (props) => {
  return (
    <View style={styles.contentBody}>
      <Text>{props.text}</Text>
      <Button buttonStyle={styles.buttonStle} title="View Profile" />
    </View>
  );
};

const ContentHeader = (props) => {
  return (
    <View style={styles.contentHeader}>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <Text style={styles.personName}> {props.personName} </Text>
    </View>
  );
};

export default class CardProfile extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View elevation={2} style={styles.card}>
        <ContentHeader personName={item.personName} />
        <ContentBody text={item.text} />
      </View>
    );
  }
}
