// @ts-nocheck

import { useState, useMemo } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import firebase, { firestore } from '../../firebase';
import { Organization } from '../../types/firestore';

import escapeHtml from 'escape-html';
import { createEditor, Node, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const { Option } = Select;

type PostDocument = {
  authorId: string;
  content: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 12 },
};

const serialize = (node: Node): any => {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};

function CreatePost() {
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(
    useFirestore().collection('organizations')
  );

  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const editor = useMemo(() => withReact(createEditor()), []);

  const onFinish = async (values: PostDocument) => {
    message.loading({ content: 'יוצרת פוסט...', key: 'create-post' });
    try {
      const content = serialize(editor);
      const org = organizations.find((org) => org.id === values.authorId);

      if (org) {
        await firestore.collection('posts').add({
          ...values,
          content,
          authorId: org.id,
          authorPicture: org.thumbnail,
          authorName: org.name,
          authorType: 'organization',
          likeCounter: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        message.success({ content: 'הפוסט נוצר', key: 'create-post' });
      } else {
        throw new Error('Organization not found.');
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
    return <p>טוענת..</p>;
  }

  return (
    <div className="form-wrapper">
      <Form {...layout} name="feed-post" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ remember: true }}>
        <Form.Item label="כותב הפוסט" name="authorId">
          <Select>
            {organizations.map((org) => (
              <Option value={org.id} key={org.id}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.thumbnail} />
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
            <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
              <Editable
                className="ant-form-item-control-input-content"
                style={{ minHeight: 150, padding: 10, border: '1px solid #d9d9d9' }}
              />
            </Slate>
          </div>
        </div>
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
