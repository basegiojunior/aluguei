import auth from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { ActivityIndicator, Button } from 'react-native-paper';

import { useAlertContext } from '@/contexts/AlertContext';
import { useUserContext } from '@/contexts/UserContext';

import styles from './Home.styles';

export const Home: React.FC = () => {
  const { setUser } = useUserContext();
  const { showAlert } = useAlertContext();

  const [loading, setLoading] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);

  async function signOut() {
    try {
      setLoading(true);
      await auth().signOut();
      setUser(null);
    } catch {
      setLoading(false);
    }
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          buttonPositive: 'OK',
          message: 'Aluguei precisa de acesso à sua localização',
          title: 'Aluguei',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            mapRef.current?.animateToRegion({
              latitude: position.coords.latitude,
              latitudeDelta: 0.0922,
              longitude: position.coords.longitude,
              longitudeDelta: 0.0421,
            });
          },
          () => {
            showAlert({
              content: 'Não foi possível acessar sua localização',
              title: 'Permissão negada',
            });
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
        );
      } else {
        showAlert({
          content: 'Não foi possível acessar sua localização',
          title: 'Permissão negada',
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} showsUserLocation style={styles.mapContainer} />

      <Button mode="contained" onPress={() => signOut()} testID="logout-button">
        Log out
      </Button>

      <ActivityIndicator animating={loading} />
    </View>
  );
};
