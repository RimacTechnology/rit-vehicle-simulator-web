import { DashboardOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOutlet } from 'react-router-dom';
import './dashboardLayout.style.scss'

function DashboardLayout() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('')

  useEffect(() => {
    setCurrentTab(window.location.pathname)
  })
  

  return (
    <Layout className='dashboardLayout'>
      <Header className="header">
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/dashboard']} /> */}
      </Header>
      <Layout>
        <Sider width={200} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentTab]}
            selectedKeys={[currentTab]}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '/dashboard',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: '/dashboard/history',
                icon: <ProfileOutlined />,
                label: 'History',
              },
              {
                key: '/dashboard/account',
                icon: <UserOutlined />,
                label: 'Account',
              },
            ]}
            onClick={(key)=>{
              navigate(key.key)
            }}
          />   
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {outlet}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout