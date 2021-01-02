import { firestore } from '../firebase';
import * as geofirestore from 'geofirestore';

type getDocumentSnapshotProps = {
  collectionPath: string;
  documentId: string;
};

// TODO: Move reference to global state
const GeoFirestore = geofirestore.initializeApp(firestore);

export async function getGeoDocumentSnapshot({
  collectionPath,
  documentId,
}: getDocumentSnapshotProps): Promise<geofirestore.GeoDocumentSnapshot> {
  const geocollection = GeoFirestore.collection(collectionPath);

  return geocollection.doc(documentId).get();
}
