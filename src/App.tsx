import { RenderRoutes as Routes } from './routes/RenderRoutes';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, AuditOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            ראשי
          </Menu.Item>

          <SubMenu key="sub1" icon={<AuditOutlined />} title="פיד">
            <Menu.Item key="2">יצירת פוסט</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
