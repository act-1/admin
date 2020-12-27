import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { firestore } from '../../firebase';

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

function CreateOrganization() {
  const onFinish = (values: EventDocument) => {
    firestore
      .collection('organizations')
      .doc(values.id)
      .set({
        ...values,
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="form-wrapper">
      <Form {...layout} name="event" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="שם הארגון" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="לוגו" name="thumbnail">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>בחר קובץ</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Slug" name="id">
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
