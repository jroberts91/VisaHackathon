import React from 'react';
import { StyleSheet, View, Platform, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import Logo from '../../images/LogoNoTagLine.png';

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#1a1f71',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.select({
      android: 85,
      default: 100,
    }),
  },
  image: {
    height: 40,
    width: 60,
  },
});

const LeftComponent = (props) => {
  let iconName, typeName;
  iconName = 'bars';
  typeName = 'font-awesome-5';
  return <Icon name={iconName} type={typeName} color="#fff" onPress={props.openDrawer} />;
};

export default class TopBar extends React.Component {
  render() {
    return (
      <View>
        <Header
          statusBarProps={{ translucent: true }}
          containerStyle={styles.topBar}
          leftComponent={<LeftComponent openDrawer={this.props.openDrawer} />}
          centerComponent={<Image style={styles.image} source={Logo} />}
        />
      </View>
    );
  }
}
