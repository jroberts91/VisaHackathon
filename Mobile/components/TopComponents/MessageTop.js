import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  button: {},
});

export default class MessageTop extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button}>
        <Icon
          name="inbox"
          solid={true}
          type="font-awesome-5"
          color="white"
          onPress={() => this.props.openMessage('Message')}
        />
      </TouchableOpacity>
    );
  }
}
