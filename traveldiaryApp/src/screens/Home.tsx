import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import { GlobalContext } from './GlobalContext';

interface Entry {
  imageUri: string;
  address: string;
}

const Home: React.FC = () => {
  const { entries, removeEntry, theme, toggleTheme } = useContext(GlobalContext);

  const themeStyles = theme === 'dark' ? darkModeStyles : lightModeStyles;

  if (!entries || entries.length === 0) {
    return (
      <View style={[styles.container, themeStyles.container]}>
        <Text style={[styles.noEntriesText, themeStyles.noEntriesText]}>No Entries yet.</Text>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyles.container]}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.entryContainer, themeStyles.entryContainer]}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <Text style={[styles.addressText, themeStyles.addressText]}>{item.address}</Text>
            <Button
              title="Remove"
              onPress={() => removeEntry(index)}
              color="red"
            />
          </View>
        )}
      />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const lightModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  noEntriesText: {
    color: '#333',
  },
  entryContainer: {
    backgroundColor: '#fff',
  },
  addressText: {
    color: '#333',
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
  },
  noEntriesText: {
    color: '#ddd',
  },
  entryContainer: {
    backgroundColor: '#333',
  },
  addressText: {
    color: '#ddd',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noEntriesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
  },
});

export default Home;