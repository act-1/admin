import { Form, Input, Switch, Button, message } from 'antd';
import firebase, { firestore } from '../../firebase';
import * as geofirestore from 'geofirestore';
import { getGeoDocumentSnapshot } from '../../services/api';

const GeoFirestore = geofirestore.initializeApp(firestore);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

function CreateOrganization() {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      message.loading({ content: 'מעלה תמונה...', key: 'upload-picture' });
      const { id, locationId } = values;
      // If locationId was provided, add the document using GeoFirestore
      if (locationId) {
        const location = await getGeoDocumentSnapshot({ collectionPath: 'locations', documentId: locationId });
        if (!location) throw new Error('Location was not found.');

        const locationData: any = location.data();
        const { name: locationName, city, province, coordinates } = locationData;
        const { latitude, longitude } = coordinates;

        await GeoFirestore.collection('posts')
          .doc(id)
          .set({
            ...values,
            locationName,
            city,
            province,
            archived: false,
            type: 'picture',
            coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      } else {
        firestore
          .collection('posts')
          .doc(id)
          .set({
            ...values,
            locationId: null,
            archived: false,
            type: 'picture',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      }

      message.success({ content: 'התמונה נוצרה בהצלחה', key: 'upload-picture' });
    } catch (err) {
      console.error(err);
      message.error({ content: 'התרחשה תקלה', key: 'upload-picture' });
    }
  };

  return (
    <div className="form-wrapper">
      <Form form={form} {...layout} name="event" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item label="כינוי משתמש" name="authorName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="תמונת משתמש" name="authorPicture" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Location ID" name="locationId">
          <Input />
        </Form.Item>
        <Form.Item label="שם מיקום" name="locationName">
          <Input />
        </Form.Item>
        <Form.Item label="כתובת תמונה" name="pictureUrl" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="רוחב תמונה" name="pictureWidth" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="גובה תמונה" name="pictureHeight" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="מסך הבית" name="homeScreen" rules={[{ required: true }]}>
          <Switch />
        </Form.Item>
        <Form.Item label="מזהה (id)" name="id" rules={[{ required: true, message: 'יש להזין מזהה' }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            יצירת ארגון
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateOrganization;
