import React from 'react';
import { View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import { fetchUsers } from '../api/api';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function MainHome({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Message" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

class AppStart extends React.Component {
  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const results = await fetchUsers();
    results.map((res) => this.props.addUser(res));
  };

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="MainHome">
          <Drawer.Screen name="MainHome" component={MainHome} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(null, { addUser: addUser })(AppStart);
