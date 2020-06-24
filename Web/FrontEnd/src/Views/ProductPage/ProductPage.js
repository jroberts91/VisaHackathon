import React from 'react';
import { Row, Col, Layout, Typography } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import API from '../../utils/baseUrl';
import ImageGrid from '../../Components/Grid/ImageGrid';
import ProductDetail from '../../Components/Layout/ProductDetail';
import MerchantDetail from '../../Components/Layout/MerchantDetail';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

class ProductDisplay extends React.Component {
  render() {
    const { images, name, price, rating, description, totalQty, soldQty } = this.props.product;
    const merchant = this.props.merchant;
    const paymentLink = this.props.paymentLink;

    return (
      <div>
        <Row gutter={[32, 64]}>
          <Col key={0} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <ImageGrid images={images}></ImageGrid>
          </Col>
          <Col key={1} lg={{ span: 16 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <ProductDetail
              name={name}
              rating={rating}
              description={description}
              price={price}
              totalQty={totalQty}
              qtySold={soldQty}
              paymentLink={paymentLink}
            />
          </Col>
        </Row>
        <Row gutter={[32, 64]}>
          <MerchantDetail
            name={merchant.name}
            address={merchant.address}
            phone={merchant.phone}
            rating={merchant.rating}
          />
        </Row>
      </div>
    );
  }
}

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      productId: this.props.match.params.productId,
      product: {},
      merchant: {},
      isOwnerShop: this.props.match.params.merchantId === this.props.loggedInId,
    };
  }

  componentDidMount = () => {
    // Get Product Information
    API.get('api/product/get?id=' + this.state.productId)
      .then((res) => {
        this.setState({ product: res.data.product });
      })
      .catch((err) => console.error(err));

    API.get('api/merchant/get?id=' + this.state.merchantId)
      .then((res) => {
        this.setState({ merchant: res.data.merchant });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { merchant, product, merchantId, productId, isOwnerShop } = this.state;
    const paymentLink = '/' + merchantId + '/product/' + productId + '/payment';
    
    let headerName;

    if (isOwnerShop) {
      headerName = 'My shop';
    } else {
      headerName = merchant.name;
    }
    
    return (
      <Content style={{ maxWidth: '900px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
        <Title level={4} style={{ color: '#828282' }}>
              <Link style={{ color: '#828282' }} to={`/${merchantId}`}><ShopOutlined /> {headerName}</Link> / {product.name} 
            </Title>
        </Row>
        <ProductDisplay product={product} paymentLink={paymentLink} merchant={merchant} />
      </Content>
    );
  }
}
