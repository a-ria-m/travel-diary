import React from 'react';
import { GlobalContextProvider } from './src/context/GlobalContext';
import AppNavigator from './src/navigation/AppNavigator'; 

export default function App() {
  return (
    <GlobalContextProvider>
      <AppNavigator />
    </GlobalContextProvider>
  );
}