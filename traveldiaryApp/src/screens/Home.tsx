import React, { useContext } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, useColorScheme } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const context = useContext(GlobalContext);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  if (!context) return null;

  const { entries, removeEntry, theme, toggleTheme } = context;

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Button title="Add New Entry" onPress={() => navigation.navigate('TravelEntry')} />
      <Button title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`} onPress={toggleTheme} />

      {entries.length === 0 ? (
        <Text style={[styles.noEntries, { color: theme === 'dark' ? '#fff' : '#000' }]}>No Entries yet</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.entry}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{item.address}</Text>
              <Button title="Remove" color="red" onPress={() => removeEntry(index)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entry: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  noEntries: {
    marginTop: 40,
    fontSize: 18,
    textAlign: 'center',
  },
});
