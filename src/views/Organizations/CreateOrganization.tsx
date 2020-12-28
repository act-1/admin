import { Form, Input, Button, message } from 'antd';
import { firestore } from '../../firebase';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

type OrganizationDocument = {
  id: string;
  name: string;
  thumbnail: string;
};

function CreateOrganization() {
  const [form] = Form.useForm();

  const onFinish = async (org: OrganizationDocument) => {
    message.loading({ content: 'רושם את הארגון...', key: 'creating-organization' });

    const orgDoc = await firestore.collection('organizations').doc(org.id).get();

    if (orgDoc.exists) {
      return message.error({ content: 'הארגון כבר קיים', key: 'creating-organization' });
    }

    firestore
      .collection('organizations')
      .doc(org.id)
      .set({
        ...org,
      });

    onReset();
    message.success({ content: 'הארגון נרשם בהצלחה!', key: 'creating-organization' });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error(errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="form-wrapper">
      <Form
        form={form}
        {...layout}
        name="event"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="שם הארגון" name="name" rules={[{ required: true, message: 'יש להזין את שם הארגון' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="לוגו" name="thumbnail" rules={[{ required: true, message: 'יש להזין לוגו' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="מזהה (id)" name="id" rules={[{ required: true, message: 'יש להזין מזהה ארגון' }]}>
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
