import React from 'react';
import { Row, Col, Layout, Typography } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import API from '../../utils/baseUrl';
import ImageGrid from '../../Components/Grid/ImageGrid';
import ProductDetail from '../../Components/Layout/ProductDetail';
import MerchantDetail from '../../Components/Layout/MerchantDetail';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

class ProductDisplay extends React.Component {
  render() {
    const { images, name, price, rating, description, totalQty, qtySold } = this.props.product;
    const merchant = this.props.merchant
    const paymentLink = this.props.paymentLink;

    return (
      <div>
        <Row gutter={[32, 64]}>
          <Col key={0} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <ImageGrid images={images}></ImageGrid>
          </Col>
          <Col key={1} lg={{ span: 16 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <ProductDetail name={name} rating={rating} description={description}
              price={price} totalQty={totalQty} qtySold={qtySold} paymentLink={paymentLink} />
          </Col>
        </Row>
        <Row gutter={[32, 64]}>
          <MerchantDetail name={merchant.name} address={merchant.address} phone={merchant.phoneNumber} rating={merchant.rating} />
        </Row>
      </div>
    )
  }
}

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      productId: this.props.match.params.productId,
      product: {},
      merchant: {}
    }
  }

  componentDidMount = () => {
    // Get Product Information
    API
      .get('api/product/get?id=' + this.state.productId)
      .then((res) => {
        this.setState({ product: res.data.product });
      })
      .catch((err) => console.error(err));

    API
      .get('api/merchant/get?id=' + this.state.merchantId)
      .then((res) => {
        console.log(res)
        this.setState({ merchant: res.data.merchant });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { merchant, product, merchantId, productId } = this.state;
    const paymentLink = "/" + merchantId + "/product/" + productId + "/payment"
    return (
      <Content style={{ maxWidth: '900px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: "#828282" }}>
            <Link to={'/'} style={{ color: "#828282" }}>
            <HomeOutlined />
            </Link> / 
            <Link to={`/${merchant._id}`} style={{ color: "#828282" }}><UserOutlined /> {merchant.name}
            </Link> / {product.name}
          </Title>
        </Row>
        <ProductDisplay product={product} paymentLink={paymentLink} merchant={merchant} />
      </Content>
    );
  }
}