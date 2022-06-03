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
  // let response: Rest[];
  const center = [lat, lng];
  const radiusInM = radiusInKm * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
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
    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);
    // .then(snapshots => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const location: FirebaseFirestoreTypes.GeoPoint = doc.get('location');

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
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

    return matchingDocs as Rest[];
  } catch {
    return [];
  }
}
