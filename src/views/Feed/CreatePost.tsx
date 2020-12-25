import { Form, Input, Select, Button, Checkbox } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

function CreatePost() {
  return (
    <div className="form-wrapper">
      <Form {...layout} name="feed-post" initialValues={{ remember: true }}>
        <Form.Item label="כותב הפוסט" name="author">
          <Select>
            <Option value="jack">
              <img
                alt=""
                style={{ width: 25, borderRadius: 25, marginLeft: 8 }}
                src="https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/107310282_1224767141316315_7285608068176542439_o.png?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=Yb-QjjdhhngAX8NYvyS&_nc_ht=scontent.ftlv16-1.fna&oh=a52ac94fb2b09975595d0f90a13fa2ad&oe=600ACBDB"
              />
              Crime Minister
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="תוכן" name="content">
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="תוכן הפוסט" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            יצירת פוסט
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
