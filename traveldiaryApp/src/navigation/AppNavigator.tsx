import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home'; // Home screen
import TravelEntry from './screens/travelEntry'; // Travel Entry screen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Core Screens */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TravelEntry" component={TravelEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;