import firebase, { firestore } from '../firebase';
import * as geofirestore from 'geofirestore';

// TODO: Move reference to global state
const GeoFirestore = geofirestore.initializeApp(firestore);

type CreateLocationProps = {
  id: string;
  name: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
};

export async function createLocation({ id, name, city, province, latitude, longitude }: CreateLocationProps) {
  const geocollection = GeoFirestore.collection('locations');

  return geocollection
    .doc(id)
    .set({ id, name, city, province, coordinates: new firebase.firestore.GeoPoint(latitude, longitude) });
}

type getDocumentSnapshotProps = {
  collectionPath: string;
  documentId: string;
};

export async function getGeoDocumentSnapshot({
  collectionPath,
  documentId,
}: getDocumentSnapshotProps): Promise<geofirestore.GeoDocumentSnapshot> {
  const geocollection = GeoFirestore.collection(collectionPath);

  return geocollection.doc(documentId).get();
}
