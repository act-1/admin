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

type EventFormValues = {
  id: string;
  title: string;
  locationName: string;
  content: string;
  organizerIds: string[];
};

function CreateEvent() {
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(
    useFirestore().collection('organizations'),
    { idField: 'id' }
  );

  const onFinish = async (values: EventFormValues) => {
    try {
      const organizers = values.organizerIds.map((orgId) => organizations.find((org) => org.id === orgId));

      await firestore
        .collection('events')
        .doc(values.id)
        .set({
          ...values,
          organizers,
        });
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
        <Form.Item label="מארגנים" name="organizerIds">
          <Select mode="multiple">
            {organizations.map((org) => (
              <Option value={org.id} key={org.id}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.profilePicture} />
                {org.name}
              </Option>
            ))}
          </Select>
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
