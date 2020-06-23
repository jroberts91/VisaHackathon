import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import ProfileInfoSection from './ProfileInfoSection';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
  },
  body: {
    marginTop: 30,
    alignItems: 'center',
    padding: 30,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  divider: {
    backgroundColor: 'grey',
  },
});

export default class ProfilePage extends React.Component {
  render() {
    const {personName} = this.props;
    return (
      <View>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
        />
        <ProfileInfoSection personName={personName} />
        <Divider style={styles.divider} />
      </View>
    );
  }
}
