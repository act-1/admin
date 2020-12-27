import { Form, Input, Select, Button } from 'antd';
import firebase, { firestore } from '../../firebase';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Organization } from '../../types/firestore';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

type EventDocument = {
  id: string;
  title: string;
  locationName: string;
  content: string;
};

function CreateEvent() {
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(useFirestore().collection('organizers'));

  const onFinish = (values: EventDocument) => {
    firestore
      .collection('events')
      .doc(values.id)
      .set({
        ...values,
      });
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
        <Form.Item label="כותרת האירוע" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="מיקום האירוע" name="locationName">
          <Input />
        </Form.Item>
        <Form.Item label="תיאור" name="content">
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="תיאור האירוע" />
        </Form.Item>
        <Form.Item label="Slug" name="id">
          <Input />
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
