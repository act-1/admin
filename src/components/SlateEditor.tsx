import { useState, useMemo } from 'react';
import escapeHtml from 'escape-html';
import { createEditor, Node, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

function serialize(node: any): any {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }
  // eslint-typescript has issues with recursive functions
  // eslint-disable-next-line
  const children = node.children.map((n: any) => serialize(n)).join('');

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
}

function SlateEditor() {
  const [text, setText] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={text} onChange={(newValue) => setText(newValue)}>
      <Editable
        className="ant-form-item-control-input-content"
        style={{ minHeight: 150, padding: 10, border: '1px solid #d9d9d9' }}
      />
    </Slate>
  );
}

export default SlateEditor;
