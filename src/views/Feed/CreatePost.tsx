import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function CreatePost() {
  return (
    <div className="form-wrapper">
      <Form {...layout} name="feed-post" initialValues={{ remember: true }}>
        <Form.Item label="משתמש" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
