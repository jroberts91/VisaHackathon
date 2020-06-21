import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Row, Col, Layout, Typography, Card } from 'antd';
import { PlusOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import ProductCard from '../../Components/Cards/ProductCard';
import Meta from 'antd/lib/card/Meta';

const { Content } = Layout;
const { Title } = Typography;

const StyledIcon = styled(PlusOutlined)`
  min-height: 220px;
  height: 100%; 
  font-size: 10em;
  color: black; 
  background-color: #FAAA13;
  line-height: 1;
  vertical-align: middle;
`;

class ProductList extends React.Component {
  render() {
    const merchantId = this.props.merchantId;

    return (
      <Row gutter={[32, 32]}>
        <Col key={-1} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
          <Link to={`/${merchantId}/addproduct`}>
            <Card
              style={{ width: '100%', minWidth: 250, height: '100%' }}
              hoverable
              cover={<StyledIcon />}
            >
              <Meta title={"Add New Product"} />
            </Card>
          </Link>
        </Col>
        {this.props.products.map((product, index) => {
          const { name, images, url, rating, _id } = product;
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <ProductCard title={name} imageUrl={images[0]} rating={rating}
                productUrl={url} productId={_id} merchantId={merchantId} />
            </Col>
          );
        })
        }
      </Row >
    );
  }
}

export default class MerchantShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      products: [],
      merchantName: ""
    }
  }

  componentDidMount = () => {
    const body = {
      merchantId: this.state.merchantId
    }
    axios
      .post('api/product/getAll', body)
      .then((res) => {
        this.setState({ products: res.data.products });
      })
      .catch((err) => console.error(err));
    axios
      .get('api/merchant/get?id=' + this.state.merchantId)
      .then((res) => {
        this.setState({ merchantName: res.data.merchant.name });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { merchantId, products } = this.state;

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{color: "#828282"}}><HomeOutlined /> / <UserOutlined /> { this.state.merchantName }</Title>
        </Row>
        <ProductList merchantId={merchantId} products={products} />
      </Content>
    );
  }
}