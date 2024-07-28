import  { useEffect, useState } from 'react';
import { Button, Divider, Flex, Layout, Menu, Tabs, theme } from "antd";
import ONstats from '../contents/ONstats';
import ABstats from '../contents/ABstats';

import {
  DesktopOutlined,
} from "@ant-design/icons";

import axios from "axios";
import style from 'antd/es/affix/style';
import Item from 'antd/es/list/Item';
import { Link } from 'react-router-dom';
import React from 'react';
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

export default function Dashboard() {

  const [selectedProvince, setSelectedProvince] = useState("ontario");

  const menuItems = [
    { key: "ontario", icon: <DesktopOutlined />, label: "Ontario" },
    { key: "alberta", icon: <DesktopOutlined />, label: "Alberta" },
    { key: "nova scotia", icon: <DesktopOutlined />, label: "Nova Scotia" },
    { key: "manitoba", icon: <DesktopOutlined />, label: "Manitoba" },
    { key: "saskatchewan", icon: <DesktopOutlined />, label: "Saskatchewan" },
    { key: "PEI", icon: <DesktopOutlined />, label: "P.E.I" },
    { key: "northwest", icon: <DesktopOutlined />, label: "Northwest Territories" },
    { key: "nunavut", icon: <DesktopOutlined />, label: "Nunavut" },
    { key: "yukon", icon: <DesktopOutlined />, label: "Yukon" },
    { key: "newfoundland", icon: <DesktopOutlined />, label: "Newfoundland" },
    { key: "british columbia", icon: <DesktopOutlined />, label: "British Columbia" },
    { key: "quebec", icon: <DesktopOutlined />, label: "Quebec" },
    

  ].sort((a, b) => a.label.localeCompare(b.label));



  const handleMenuClick = ({ key }) => {
    setSelectedProvince(key);
  };

    const renderContent = () => {
    switch (selectedProvince) {
      case 'ontario':
        return <ONstats />;
      case 'alberta':
        return <ABstats />;
      // Add more cases for other provinces
      default:
        return <div>Select a province to view stats</div>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          defaultSelectedKeys={["ontario"]}
          mode="inline"
          onClick={handleMenuClick}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: theme === 'light' ? '#fff' : '#001529' }}>
          <Flex align="flex-start" justify="flex-end" horizontal>
          <div style={{ color: "#fff", textAlign: "center", fontSize: "24px" }}>
            SparkSense Dashboard
          </div>
          <Divider type="vertical" />
          <Button ghost={true} type='primary' style={{color: "white", border: "none", fontSize:"1.25rem", marginTop:'1rem'}}><Link to={'/'}>Home</Link></Button>

          </Flex>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Information" key="1">
              {renderContent()}
             
            </TabPane>
            

          </Tabs>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Information" key="1">
              {renderContent()}
             
            </TabPane>
            

          </Tabs>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Information" key="1">
              {renderContent()}
             
            </TabPane>
            

          </Tabs>

        </Content>
        <Footer style={{ textAlign: "center" }}>
          SparkSense ©2024 Created by SparkSense
        </Footer>
      </Layout>
    </Layout>
  );
}