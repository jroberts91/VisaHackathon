import React from 'react';
import MerchantCard from '../../Components/Cards/MerchantCard';
import MaiYuGe from '../../images/maiyuge.jpg';
import { Row, Col, Layout, Space, Select, Typography } from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { Text, Title } = Typography;

const listOfMerchants = [
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 4,
  },
  {
    name: 'Mai Yu Ge Seafood',
    profileImage: MaiYuGe,
    description: 'Mainly selling seafood that is freshly taken from Johor Bahru',
    rating: 3,
  },
];

class MerchantList extends React.Component {
  render() {
    return (
      <Row gutter={[32, 32]}>
        {this.props.merchants.map((merchant, index) => {
          const { name, profileImage, description, rating } = merchant;
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <MerchantCard title={name} imageUrl={profileImage} description={description} rating={rating} />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      sortBy: 'popular',
    };
  }

  componentDidMount = () => {
    this.setState({ merchants: listOfMerchants });
  };

  render() {
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
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
    );
  }
}
