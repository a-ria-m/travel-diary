import React from 'react';
import { GlobalContextProvider } from './src/context/GlobalContext';
import AppNavigator from './src/navigation/AppNavigator'; 
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

export default function App() {
  return (
    <GlobalContextProvider>
      <AppNavigator />
    </GlobalContextProvider>
  );
}