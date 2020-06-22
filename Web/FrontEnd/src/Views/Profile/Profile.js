import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Layout, Typography, Card } from 'antd';
import { PlusOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
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

class DetailsList extends React.Component {
  render() {
    const { merchantId, products, isOwnerShop } = this.props;

    return;
  }
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      products: [],
      merchantName: '',
      isOwnerShop: false,
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = (nextProps) => {
    const newMerchantId = nextProps.match.params.merchantId;
    if (newMerchantId !== this.props.match.params.merchantId) {
      this.setState({ merchantId: newMerchantId });
      this.getProductFromApi(newMerchantId);
      this.getMerchantNameFromApi(newMerchantId);
      this.getIsOwnerShopFromApi(newMerchantId);
    }
  };

  render() {
    const { merchantId, products, isOwnerShop } = this.state;

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <HomeOutlined /> / <UserOutlined /> {this.state.merchantName}
          </Title>
        </Row>
        <DetailsList merchantId={merchantId} products={products} isOwnerShop={isOwnerShop} />
      </Content>
    );
  }
}
