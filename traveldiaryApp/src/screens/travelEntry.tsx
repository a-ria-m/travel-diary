import React, { useState, useContext } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigation } from '@react-navigation/native';

const TravelEntry = () => {
  const context = useContext(GlobalContext);
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');

  if (!context) return null;
  const { addEntry, theme } = context;

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      getAddress();
    }
  };

  const getAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission is required.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);

    if (geocode.length > 0) {
      const place = geocode[0];
      const fullAddress = `${place.name}, ${place.street}, ${place.city}`;
      setAddress(fullAddress);
    } else {
      setAddress('Address not found');
    }
  };

  const handleSave = async () => {
    if (!imageUri || !address) {
      Alert.alert('Missing Info', 'Take a picture and wait for the address.');
      return;
    }

    await addEntry({ imageUri, address });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Entry Saved!',
        body: 'Your travel entry has been saved.',
      },
      trigger: null,
    });

    navigation.goBack();
  };

  const handleCancel = () => {
    setImageUri(null);
    setAddress('');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <Button title="Take Picture" onPress={takePicture} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {address ? <Text style={[styles.address, { color: theme === 'dark' ? '#fff' : '#000' }]}>{address}</Text> : null}

      <View style={styles.buttonRow}>
        <Button title="Save" onPress={handleSave} disabled={!imageUri || !address} />
        <Button title="Cancel" color="red" onPress={handleCancel} />
      </View>
    </View>
  );
};

export default TravelEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
