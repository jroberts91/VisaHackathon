import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainContainer from './MainContainer';
import { Icon } from 'react-native-elements';
import TopBar from './TopComponents/TopBar';

const Tab = createBottomTabNavigator();

export default class MainTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, typeName, solid;

            if (route.name === 'Cart') {
              iconName = 'home';
              typeName = 'font-awesome-5';
              solid = focused ? true : false;
            } else if (route.name === 'Profile') {
              iconName = 'user';
              typeName = 'font-awesome-5';
              solid = focused ? true : false;
            } else if (route.name === 'Scan') {
              iconName = 'qrcode';
              typeName = 'font-awesome-5';
              solid = focused ? true : false;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} solid={solid} type={typeName} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1a1f71',
          inactiveTintColor: '#fff',
          showLabel: false,
          style: {
            backgroundColor: '#FAA913',
          },
          labelStyle: {
            fontSize: 12,
            fontFamily: 'Abel-Regular',
          },
        }}
      >
        <Tab.Screen
          name="Cart"
          component={MainContainer}
          initialParams={{
            pageName: 'Cart',
            openDrawer: this.props.navigation.openDrawer,
            openMessage: this.props.navigation.push,
          }}
          options={{ tabBarVisible: true }}
        />
        <Tab.Screen
          name="Profile"
          component={MainContainer}
          initialParams={{
            pageName: 'Profile',
            openDrawer: this.props.navigation.openDrawer,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={MainContainer}
          initialParams={{
            pageName: 'Scan',
            openDrawer: this.props.navigation.openDrawer,
          }}
        />
      </Tab.Navigator>
    );
  }
}
