import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context value
interface GlobalContextType {
  entries: Entry[];
  addEntry: (entry: Entry) => Promise<void>;
  removeEntry: (index: number) => Promise<void>;
  theme: 'light' | 'dark'; // Theme state
  toggleTheme: () => void; // Method to toggle theme
}

interface Entry {
  imageUri: string;
  address: string;
}

// Create the context
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Context provider component
export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light mode

  // Load entries from AsyncStorage on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('entries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error('Error loading entries from AsyncStorage:', error);
      }
    };

    loadEntries();
  }, []);

  // Save entries to AsyncStorage whenever they change
  useEffect(() => {
    const saveEntries = async () => {
      try {
        await AsyncStorage.setItem('entries', JSON.stringify(entries));
      } catch (error) {
        console.error('Error saving entries to AsyncStorage:', error);
      }
    };

    saveEntries();
  }, [entries]);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
          setTheme(storedTheme as 'light' | 'dark');
        }
      } catch (error) {
        console.error('Error loading theme from AsyncStorage:', error);
      }
    };

    loadTheme();
  }, []);

  // Save theme to AsyncStorage whenever it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error saving theme to AsyncStorage:', error);
      }
    };

    saveTheme();
  }, [theme]);

  // Function to add an entry
  const addEntry = async (entry: Entry) => {
    setEntries(prevEntries => [...prevEntries, entry]);
  };

  // Function to remove an entry by index
  const removeEntry = async (index: number) => {
    setEntries(prevEntries => prevEntries.filter((_, i) => i !== index));
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <GlobalContext.Provider value={{ entries, addEntry, removeEntry, theme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};