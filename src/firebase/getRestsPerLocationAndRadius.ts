import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import * as geofire from 'geofire-common';

import { Rest } from '@/model/Rest.types';

export async function getRestsPerLocationAndRadius({
  lat,
  lng,
  radiusInKm,
}: {
  lat: number;
  lng: number;
  radiusInKm: number;
}): Promise<Rest[]> {
  const center = [lat, lng];
  const radiusInM = radiusInKm * 1000;

  const boundList = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  for (const bound of boundList) {
    const query = firestore()
      .collection('rents')
      .orderBy('geohash')
      .startAt(bound[0])
      .endAt(bound[1]);

    promises.push(query.get());
  }

  try {
    const snapshots = await Promise.all(promises);
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const location: FirebaseFirestoreTypes.GeoPoint = doc.get('location');
        const distanceInKm = geofire.distanceBetween(
          [location.latitude, location.longitude],
          center,
        );
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc.data());
        }
      }
    }

    while (matchingDocs.length > 10) {
      const selectedIndex = Math.floor(Math.random() * matchingDocs.length);
      matchingDocs.splice(selectedIndex, 1);
    }

    return matchingDocs as Rest[];
  } catch {
    return [];
  }
}
