import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tabs, theme } from "antd";
import InformationModal from "./information-modal";
import AlertNotifcation from "./alert-notification";
const { Header, Footer, Sider, Content } = Layout;

// Start testing code
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const sideBarItems = [
  getItem("Overview", "1", <DesktopOutlined />),
  getItem("Alerts", "2", <PieChartOutlined />),
  getItem("Radio", "sub1", <TeamOutlined />, [
    getItem("All", "3"),
    getItem("CAF", "4"),
    getItem("Fire", "5"),
    getItem("Paramedics", "6"),
    getItem("Police", "7"),
  ]),
  getItem("Records", "8", <FileOutlined />),
];

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "98vh",
  // width: "calc(50% - 8px)",
  // maxWidth: "calc(50% - 8px)",
};

const Dashboard = () => (
  // const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // End testing code

  <Layout style={layoutStyle}>
    <Header style={headerStyle}>Header</Header>
    <Layout>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>
);

export default Dashboard;

// import React, { useState } from "react";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Tabs, theme } from "antd";
// import InformationModal from "./information-modal";
// import AlertNotifcation from "./alert-notification";
// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const sideBarItems = [
//   getItem("Overview", "1", <DesktopOutlined />),
//   getItem("Alerts", "2", <PieChartOutlined />),
//   getItem("Radio", "sub1", <TeamOutlined />, [
//     getItem("All", "3"),
//     getItem("CAF", "4"),
//     getItem("Fire", "5"),
//     getItem("Paramedics", "6"),
//     getItem("Police", "7"),
//   ]),
//   getItem("Records", "8", <FileOutlined />),
// ];

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       <AlertNotifcation></AlertNotifcation>
//       <Layout
//         style={{
//           display: "flex",
//           flexDirection: "row",
//         }}
//       >
//         <Header
//           style={{
//             display: "flex",
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         />

//         <Content
//           style={{
//             // margin: "0 16px",
//             display: "flex",
//             flexDirection: "row",
//           }}
//         >
//           <div>
//             <Sider
//               collapsible
//               collapsed={collapsed}
//               onCollapse={(value) => setCollapsed(value)}
//             >
//               <div className="demo-logo-vertical" />
//               <Menu
//                 theme="light"
//                 defaultSelectedKeys={["1"]}
//                 mode="inline"
//                 items={sideBarItems}
//                 style={{
//                   marginTop: "4px",
//                 }}
//               />
//             </Sider>
//           </div>

//           <div
//             style={{
//               margin: "10px 0",
//               padding: 24,
//               height: "97%",
//               // minHeight: 360,
//               width: "100%",
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Tabs
//               defaultActiveKey="0"
//               centered
//               items={[
//                 {
//                   label: "Ontario",
//                   key: "0",
//                   children: "Component for Ontario",
//                 },
//                 {
//                   label: "Alberta",
//                   key: "1",
//                   children: "Component for Alberta",
//                 },
//               ]}
//             />
//           </div>
//         </Content>

//         <Footer
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             textAlign: "center",
//           }}
//         >
//           SparkSense © {new Date().getFullYear()}. Created for StarterHacks.
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;
