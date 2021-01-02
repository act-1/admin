import { Form, Input, Select, DatePicker, Button } from 'antd';

import firebase, { firestore } from '../../firebase';
import * as geofirestore from 'geofirestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { getGeoDocumentSnapshot } from '../../services/api';
import { Organization } from '../../types/firestore';
import SlateEditor from '../../components/SlateEditor';
import LocationAutoComplete from '../../components/LocationAutoComplete';

const { RangePicker } = DatePicker;
const { Option } = Select;

// TODO: Move reference to global state
const GeoFirestore = geofirestore.initializeApp(firestore);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

type EventFormValues = {
  id: string;
  title: string;
  eventDate: [{ _d: Date }, { _d: Date }];
  locationId: string;
  content: string;
  organizerIds: string[];
  thumbnail: string;
};

function CreateEvent() {
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(
    useFirestore().collection('organizations'),
    { idField: 'id' }
  );

  const onFinish = async (values: EventFormValues) => {
    try {
      const { id, title, eventDate, locationId, content, organizerIds, thumbnail } = values;

      const location = await getGeoDocumentSnapshot({ collectionPath: 'locations', documentId: locationId });
      if (!location) throw new Error('Location was not found.');

      const { latitude, longitude } = location.data()!.coordinates;

      const [start, end] = eventDate;
      const startDate = firebase.firestore.Timestamp.fromDate(start._d);
      const endDate = firebase.firestore.Timestamp.fromDate(end._d);

      // const organizers = organizerIds.map((orgId) => organizations.find((org) => org.id === orgId));
      // await GeoFirestore.collection('events')
      //   .doc(id)
      //   .set({
      //     title,
      //     locationId,
      //     thumbnail,
      //     startDate,
      //     endDate,
      //     content,
      //     organizers,
      //     coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (!organizations || organizations.length === 0) {
    return <p>טוענת..</p>;
  }

  return (
    <div className="form-wrapper">
      <Form {...layout} name="event" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="כותרת האירוע" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="תאריך ושעה" name="eventDate" rules={[{ required: true }]}>
          <RangePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="location ID" name="locationId" rules={[{ required: true }]}>
          <LocationAutoComplete />
        </Form.Item>
        <Form.Item label="תיאור" name="content">
          <SlateEditor />
        </Form.Item>
        <Form.Item label="מארגנים" name="organizerIds" rules={[{ required: true }]}>
          <Select mode="multiple">
            {organizations.map((org) => (
              <Option value={org.id} key={org.id}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.profilePicture} />
                {org.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Slug" name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="כתובת תמונה" name="thumbnail" rules={[{ required: true }]}>
          <Input type="url" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            יצירת אירוע
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateEvent;
