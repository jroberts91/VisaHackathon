import React from 'react';

import MerchantCard from '../Components/Cards/MerchantCard';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Row, Col, Layout, Space, Select, Typography, Button } from 'antd';
import MaiYuGe from '../images/maiyuge.jpg';
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Text, Title } = Typography;

const listOfMerchants = [
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    title: 'Mai Yu Ge Seafood',
    imageUrl: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
];

class MerchantList extends React.Component {
  render() {
    return (
      <Row gutter={[32, 32]}>
        {this.props.merchants.map((merchant, index) => {
          const { title, imageUrl, description, rating } = merchant;
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <MerchantCard title={title} imageUrl={imageUrl} description={description} rating={rating} />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideDrawerOpened: true,
      companyName: '',
      merchants: [],
      sortBy: 'popular',
    };
  }

  componentDidMount = () => {
    this.setState({ merchants: listOfMerchants });
  };

  render() {
    const { isSideDrawerOpened } = this.state;
    const sideDrawerWidth = isSideDrawerOpened ? 200 : 0;
    const openSideDrawer = () => this.setState({ isSideDrawerOpened: true });
    const closeSideDrawer = () => this.setState({ isSideDrawerOpened: false });
    return (
      <Layout>
        <Header style={{ marginLeft: `${sideDrawerWidth}px` }}>
          {!isSideDrawerOpened && (
            <Button style={{ border: 'none' }} ghost icon={<MenuUnfoldOutlined />} onClick={openSideDrawer} />
          )}
          <Text style={{ color: 'white' }}>NavBar</Text>
        </Header>
        <Layout>
          <Sider
            width={sideDrawerWidth}
            style={{
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
            }}
          >
            <Text style={{ color: 'white' }}>Side drawer</Text>
            {isSideDrawerOpened && (
              <Button style={{ border: 'none' }} ghost icon={<MenuFoldOutlined />} onClick={closeSideDrawer} />
            )}
          </Sider>
          <Layout style={{ margin: '0 auto', marginLeft: `${sideDrawerWidth}px` }}>
            <Content style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
                <Title level={2}>Merchants</Title>
                <Space direction="vertical" size={1}>
                  <Text>Sort By</Text>
                  <Select defaultValue={this.state.sortBy} size="large" style={{ minWidth: '150px' }}>
                    <Option value="popular">Popular</Option>
                    <Option value="rating">Rating</Option>
                    <Option value="time">Time Joined</Option>
                  </Select>
                </Space>
              </Row>
              <MerchantList merchants={this.state.merchants} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
