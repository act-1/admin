// @ts-nocheck

import { useState, useMemo } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { firestore } from '../../firebase';
import { Organization } from '../../types/firestore';

import escapeHtml from 'escape-html';
import { createEditor, Node, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const { Option } = Select;
const { TextArea } = Input;

type PostDocument = {
  organizationId: string;
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
  const { data: organizations }: { data: Organization[] } = useFirestoreCollectionData(useFirestore().collection('organizers'));
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const editor = useMemo(() => withReact(createEditor()), []);

  const onFinish = async (values: PostDocument) => {
    try {
      const content = serialize(editor);

      firestore
        .collection('posts')

        .add({
          ...values,
          content,
        });
    } catch (err) {
      console.error(err);
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
      <Form {...layout} name="feed-post" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ remember: true }}>
        <Form.Item label="כותב הפוסט" name="organizationId">
          <Select>
            {organizations.map((org) => (
              <Option value={org.NO_ID_FIELD} key={org.NO_ID_FIELD}>
                <img alt="" style={{ width: 25, borderRadius: 25, marginLeft: 8 }} src={org.thumbnail} />
                {org.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item label="תוכן" name="content" noStyle> */}
        <label>תוכן:</label>
        <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
          <Editable style={{ width: 200, padding: 10, border: '1px solid #d9d9d9' }} />
        </Slate>
        {/* <TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="תוכן הפוסט" /> */}
        {/* </Form.Item> */}
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
