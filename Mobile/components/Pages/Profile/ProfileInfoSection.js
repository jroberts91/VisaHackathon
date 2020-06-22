import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';

const styles = StyleSheet.create({
  body: {
    marginTop: 30,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
});

export default class ProfileInfoSection extends React.Component {
  render() {
    const {personName} = this.props;
    return (
      <View style={styles.body}>
        <Text style={styles.name}> {personName} </Text>
      </View>
    );
  }
}
