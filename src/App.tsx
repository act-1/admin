import { RenderRoutes as Routes } from './routes/RenderRoutes';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, CalendarOutlined, AuditOutlined, TeamOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">ראשי</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<CalendarOutlined />} title="אירועים">
            <Menu.Item key="2">
              <Link to="/events/new">אירוע חדש</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<AuditOutlined />} title="תמונות">
            <Menu.Item key="3">
              <Link to="/pictures/new">תמונה חדשה</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="ארגונים">
            <Menu.Item key="4">
              <Link to="/organizations/new">ארגון חדש</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Act1</Breadcrumb.Item>
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
