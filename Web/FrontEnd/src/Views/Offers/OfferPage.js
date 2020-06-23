import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Layout, Typography, Card } from 'antd';
import { PlusOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import OfferCard from '../../Components/Cards/OfferCard';
import Meta from 'antd/lib/card/Meta';
import API from '../../utils/baseUrl';

const { Content } = Layout;
const { Title } = Typography;

const StyledIcon = styled(PlusOutlined)`
  min-height: 220px;
  height: 100%;
  font-size: 10em;
  color: black;
  background-color: #faaa13;
  line-height: 1;
  vertical-align: middle;
`;

class ProductList extends React.Component {
  render() {
    const { merchantId, products } = this.props;

    return (
      <Row gutter={[32, 32]}>
        {products.map((product, index) => {
          const { name, images, url, rating, _id } = product;
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <OfferCard
                title={name}
                imageUrl={images[0]}
                rating={rating}
                productUrl={url}
                productId={_id}
                merchantId={merchantId}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default class OfferPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
  }

  getOffersFromApi = (merchantId) => {
    const body = {
      merchantId: merchantId,
    };
    API.post('api/product/getAll', body)
      .then((res) => {
        this.setState({ products: res.data.products });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {};

  render() {
    const { merchantName } = this.props;
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <HomeOutlined /> / <UserOutlined /> {merchantName}
          </Title>
        </Row>
      </Content>
    );
  }
}
