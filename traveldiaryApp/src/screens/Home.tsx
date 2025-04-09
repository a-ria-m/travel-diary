import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Switch,
  useColorScheme,
} from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const context = useContext(GlobalContext);
  const navigation = useNavigation();
  const isDark = context?.theme === 'dark';

  if (!context) return null;

  const { entries, toggleTheme,removeEntry } = context;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Travel Diary</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <FlatList
        data={entries}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <Text style={[styles.address, isDark && styles.addressDark]}>
              {item.address}
            </Text>
            <Button title="Remove" style={[styles.address, isDark && styles.addressDark]} onPress={() => removeEntry(index)} />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TravelEntry' as never)}
      >
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  titleDark: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 150,
    width: '100%',
  },
  address: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  addressDark: {
    color: '#ddd',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    left: '50%',
    marginLeft: -30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  plus: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
  },
});
