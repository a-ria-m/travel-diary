import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home'; // Correct relative path
import CartScreen from '../screens/Cart'; // Correct relative path
import Checkout from '../screens/Checkout'; // Correct relative path
import CameraScreen from '../screens/Camera'; // Correct relative path
import GeolocationScreen from '../screens/Geolocation'; // Correct relative path
import AsyncStorageTest from '../screens/AsyncStorage'; // Correct relative path
import NotificationScreen from '../screens/LocalPushNotification'; // Correct relative path

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Core Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={Checkout} />

        {/* Additional Screens */}
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Geolocation" component={GeolocationScreen} />
        <Stack.Screen name="AsyncStorage" component={AsyncStorageTest} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;