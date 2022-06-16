import React, { useEffect, useRef } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Region } from 'react-native-maps';
import { Appbar, Chip, TextInput } from 'react-native-paper';

import { useAlertContext } from '@/contexts/AlertContext';
import { getRestsPerLocationAndRadius } from '@/firebase/getRestsPerLocationAndRadius';
import { Rest } from '@/model/Rest.types';

import Filter from './components/Filter';
import styles from './Search.styles';

export const Search: React.FC = () => {
  const { showAlert } = useAlertContext();

  const [filterVisible, setFilterVisible] = React.useState(false);
  const [region, setRegion] = React.useState<Region | undefined>();
  const [rests, setRests] = React.useState<Rest[]>([]);

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

  async function getRests() {
    if (region) {
      const restsResponse = await getRestsPerLocationAndRadius({
        lat: region.latitude,
        lng: region.longitude,
        radiusInKm: region.latitudeDelta * 111,
      });

      setRests(restsResponse);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    getRests();
  }, [region]);

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
      <MapView
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        showsUserLocation
        style={styles.mapContainer}>
        {rests.map(rest => (
          <Marker
            coordinate={{
              latitude: parseFloat(rest.location.latitude),
              longitude: parseFloat(rest.location.longitude),
            }}
            key={rest.geohash}>
            <Chip mode="outlined">{rest.price}</Chip>
          </Marker>
        ))}
      </MapView>
      <Filter
        onDimiss={() => setFilterVisible(false)}
        visible={filterVisible}
      />
    </View>
  );
};
