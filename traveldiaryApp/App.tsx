import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CameraScreen from './src/Camera';
import GeolocationScreen from './src/Geolocation';
import AsyncStorageTest from './src/AsyncStorage';
import NotificationScreen from './src/LocalPushNotification';
import { GlobalContextProvider } from './src/screens/GlobalContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Geolocation" component={GeolocationScreen} />
          <Stack.Screen name="AsyncStorage" component={AsyncStorageTest} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}