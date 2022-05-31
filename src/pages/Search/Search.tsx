import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { Appbar, TextInput } from 'react-native-paper';

import { useAlertContext } from '@/contexts/AlertContext';

import Filter from './components/Filter';
import styles from './Search.styles';

export const Search: React.FC = () => {
  const { showAlert } = useAlertContext();

  const [filterVisible, setFilterVisible] = React.useState(false);

  const mapRef = useRef<MapView>(null);

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
      <Appbar.Header style={styles.header}>
        <TextInput
          left={<TextInput.Icon name="magnify" />}
          mode="outlined"
          placeholder="Buscar Cidade, Bairro, Rua, etc..."
          right={
            <TextInput.Icon
              forceTextInputFocus={false}
              name="filter"
              onPress={() => setFilterVisible(true)}
            />
          }
          style={styles.headerInput}
        />
      </Appbar.Header>
      <MapView ref={mapRef} showsUserLocation style={styles.mapContainer} />
      <Filter
        onDimiss={() => setFilterVisible(false)}
        visible={filterVisible}
      />
    </View>
  );
};
