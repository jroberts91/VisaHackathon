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

            if (route.name === 'Home') {
              iconName = 'home';
              typeName = 'font-awesome-5';
              solid = focused ? true : false;
            } else if (route.name === 'Profile') {
              iconName = 'user';
              typeName = 'font-awesome-5';
              solid = focused ? true : false;
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} solid={solid} type={typeName} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#80A0AB',
          showLabel: false,
          style: {
            backgroundColor: '#485155',
          },
          labelStyle: {
            fontSize: 12,
            fontFamily: 'Abel-Regular',
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={MainContainer}
          initialParams={{
            pageName: 'Home',
            openDrawer: this.props.navigation.openDrawer,
            openMessage: this.props.navigation.push,
          }}
          options={{ tabBarVisible: true }}
        />
        <Tab.Screen
          name='Profile'
          component={MainContainer}
          initialParams={{
            pageName: 'Profile',
            openDrawer: this.props.navigation.openDrawer,
          }}
        />
      </Tab.Navigator>
    );
  }
}
