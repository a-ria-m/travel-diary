import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
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

  const isDark = theme === 'dark';

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
      const fullAddress = `${place.city ?? ''}, ${place.region ?? ''}, ${place.country ?? ''}`;
      setAddress(fullAddress.trim().replace(/\s{2,}/g, ' '));
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
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>Take Picture</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {address ? (
        <Text style={[styles.address, { color: isDark ? '#fff' : '#000' }]}>{address}</Text>
      ) : null}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: !imageUri || !address ? '#ccc' : '#007AFF',
              opacity: !imageUri || !address ? 0.6 : 1,
            },
          ]}
          onPress={handleSave}
          disabled={!imageUri || !address}
        >
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: 'red' }]}
          onPress={handleCancel}
        >
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});
