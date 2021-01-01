import firebase, { firestore } from '../firebase';

type getDocumentSnapshotProps = {
  collectionPath: string;
  documentId: string;
};

export async function getDocumentSnapshot({
  collectionPath,
  documentId,
}: getDocumentSnapshotProps): Promise<firebase.firestore.DocumentSnapshot> {
  return firestore.collection(collectionPath).doc(documentId).get();
}
