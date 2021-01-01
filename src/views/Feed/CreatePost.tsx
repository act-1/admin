// @ts-nocheck

import { useState } from 'react';
import { Popconfirm, Form, Select, Button, message } from 'antd';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import firebase, { firestore } from '../../firebase';
import { Organization } from '../../types/firestore';
import SlateEditor from '../../components/SlateEditor';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

function CreatePost() {
  const [form] = Form.useForm();
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(
    useFirestore().collection('organizations')
  );

  const [content, setContent] = useState();

  const submitPost = async () => {
    const authorId = form.getFieldValue('authorId');

    message.loading({ content: 'יוצרת פוסט...', key: 'create-post' });

    try {
      const org = organizations.find((org) => org.id === authorId);

      if (org) {
        const post = {
          content,
          authorId: org.id,
          authorPicture: org.profilePicture,
          authorName: org.name,
          authorType: 'organization',
        };

        await firestore.collection('posts').add({
          ...post,
          likeCounter: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        message.success({ content: 'הפוסט פורסם', key: 'create-post' });
      } else {
        throw new Error('התרחשה שגיאה במציאת הארגון.');
      }
    } catch (err) {
      message.error({ content: err.message, key: 'creating-organization' });
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error({ content: 'התרחשה תקלה' });
    console.log('Failed:', errorInfo);
  };

  if (!organizations || organizations.length === 0) {
    return <p>מזה אין ארגונים</p>;
  }

  return (
    <div className="form-wrapper">
      <Form {...layout} form={form} name="feed-post" onFinishFailed={onFinishFailed} initialValues={{ remember: true }}>
        <Form.Item label="כותב הפוסט" name="authorId">
          <Select>
            {organizations.map((org) => (
              <Option value={org.id} key={org.id}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.profilePicture} />
                {org.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="ant-row ant-row-rtl ant-form-item">
          <div className="ant-col ant-col-8 ant-form-item-label ant-col-rtl">
            <label>תוכן</label>
          </div>

          <div className="ant-col ant-col-12 ant-form-item-control ant-col-rtl">
            <SlateEditor onChange={(htmlContent) => setContent(htmlContent)} />
          </div>
        </div>
        <Form.Item {...tailLayout}>
          <Popconfirm title="לפרסם?" onConfirm={submitPost}>
            <Button type="primary" htmlType="submit">
              יצירת פוסט
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
