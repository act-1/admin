import { Form, Input, Select, Button, Checkbox } from 'antd';
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

function CreatePost() {
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(useFirestore().collection('organizers'));

  if (!organizations || organizations.length === 0) {
    return <p>טוענת..</p>;
  }

  return (
    <div className="form-wrapper">
      <Form {...layout} name="feed-post" initialValues={{ remember: true }}>
        <Form.Item label="כותב הפוסט" name="author">
          <Select>
            {organizations.map((org) => (
              <Option value={org.NO_ID_FIELD} key={org.NO_ID_FIELD}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.thumbnail} />
                {org.title}
              </Option>
            ))}
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
