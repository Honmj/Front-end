import React, { useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import { renderMenu } from '@/components/siderItem';
import { useHistory } from 'react-router-dom';
import routes from '~/src/router';

const { Header, Sider, Footer, Content } = Layout;

const Index: React.FC = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const menuList = useMemo(() => renderMenu(routes), []);

  const setCollapseStatus = () => {
    setIsCollapsed((state) => !state);
  };
  const menuClick = ({ key }) => {
    history.push(key);
  };

  return (
    <>
      <Layout className="index-layout">
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={menuClick}
            className="sid"
          >
            {menuList}
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <span>
              {isCollapsed ? (
                <MenuUnfoldOutlined className="collapse-icon" onClick={setCollapseStatus} />
              ) : (
                <MenuFoldOutlined onClick={setCollapseStatus} className="collapse-icon" />
              )}
            </span>
          </Header>
          <Content className="content">{children}</Content>

          <Footer className="footer" />
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
