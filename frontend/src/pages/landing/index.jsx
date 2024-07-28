import React, { useState } from 'react';
import { Button, Flex, Layout, theme } from 'antd';
import {Typography} from "antd"
import style from 'antd/es/affix/style';
import flex from 'antd/es/flex';
import { Link } from 'react-router-dom';
const { Header, Content } = Layout;
const { Title } = Typography;

const Landing = () => {
  const [size, setSize] = useState('large');

  return (
    <Layout style={{
      backgroundImage: 'url("https://images8.alphacoders.com/918/918681.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      opacity: 0.8,

    }}>
      <Header
        style={{
          paddingTop: '20px',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          opacity: 1,
        }}
      >

        <Flex gap="middle" align='flex-start' horizontal justify='flex-end' >
          <Button ghost={true} type='primary' style={{color: "white", border: "none", fontSize:"1.25rem"}}>Home</Button>
          <Button  ghost={true}  type='primary' style={{color: "white", border: 'none', fontSize:"1.25rem"}}><Link to={'/dashboard'}>Dashboard</Link></Button>
       
        </Flex>
     
      </Header>
      <Content
        style={{
          padding: '175px 48px',

        }}
        
      >
        <Flex gap="middle" align='center' vertical justify='center' >

        <Title 
          italic={true}
          strong
          style={{fontSize: '4rem', flex: 1, textAlign: 'center', color: 'white', textShadow: '2px 2px 4px #000000', opacity: 1}}
            >
              SparkSense
        </Title>

         <Button type="primary" size={size} ghost={true} style={{color: "white", borderColor: "white", padding: '30px 30px', fontSize: '2rem'}}>
              <Link to={'/dashboard'}>Dashboard</Link>
          </Button>

          </Flex>
 
        
      </Content>
     
    </Layout>
  );
};
export default Landing;