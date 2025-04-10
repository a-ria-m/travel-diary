import React from 'react';
import { GlobalContextProvider } from './src/context/GlobalContext';
import AppNavigator from './src/navigation/AppNavigator'; 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <GlobalContextProvider>
      <AppNavigator />
    </GlobalContextProvider>
  );
}