import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import MessageTop from './MessageTop';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#80A0AB',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.select({
      android: 85,
      default: 100,
    }),
  },
});

const LeftComponent = (props) => {
  let iconName, typeName;
  iconName = 'bars';
  typeName = 'font-awesome-5';
  return <Icon name={iconName} type={typeName} color="white" onPress={props.openDrawer} />;
};

export default class TopBar extends React.Component {
  render() {
    return (
      <View>
        <Header
          statusBarProps={{ translucent: true }}
          containerStyle={styles.topBar}
          leftComponent={<LeftComponent openDrawer={this.props.openDrawer} />}
          centerComponent={{ text: 'Visell', style: { color: '#fff' } }}
          rightComponent={<MessageTop openMessage={this.props.openMessage} />}
        />
      </View>
    );
  }
}
