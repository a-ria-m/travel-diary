import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Home from '../screens/Home';
import TravelEntry from '../screens/TravelEntry';
import { GlobalContext } from '../context/GlobalContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { theme } = context;

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TravelEntry"
          component={TravelEntry}
          options={{ title: 'New Entry' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
