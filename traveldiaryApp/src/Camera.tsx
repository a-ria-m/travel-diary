import React, { useState, useContext } from 'react';
import { View, Button, Image, StyleSheet, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { GlobalContext } from './context/GlobalContext';
import { formatAddress } from './Geolocation'; 

export default function CameraScreen() {
  const { addEntry } = useContext(GlobalContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<Location.Coordinates | null>(null);

  // Request permissions for camera and location
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraStatus.granted) {
        Alert.alert('Permission required', 'Camera permission is required.');
      }

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (!locationStatus.granted) {
        Alert.alert('Permission required', 'Location permission is required.');
      }
    })();
  }, []);

  // Take a picture
  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      fetchCurrentLocation(); // Automatically fetch location after taking a picture
    }
  };

  // Fetch current location and reverse geocode it
  const fetchCurrentLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(coords);

      // Reverse geocode the location to get the address
      const addressData = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setAddress(formatAddress(addressData[0]));
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Failed to fetch location.');
    }
  };

  // Save the travel entry
  const saveEntry = async () => {
    if (!imageUri || !address) {
      Alert.alert('Missing Information', 'Please capture an image and ensure an address is available.');
      return;
    }

    const entry: Entry = {
      imageUri,
      address,
    };

    await addEntry(entry);
    setImageUri(null);
    setAddress('');
    setLocation(null);

    // Send a local push notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Travel Entry Saved',
        body: `Successfully saved entry at ${entry.address}`,
        sound: 'default',
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Picture" onPress={takePicture} />
      {imageUri && (
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.addressText}>Address: {address}</Text>
          <Button title="Save Entry" onPress={saveEntry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 10,
  },
});