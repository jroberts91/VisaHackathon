import React from 'react';
import { Link } from 'react-router-dom';
import PaymentProductCard from '../../Components/Cards/PaymentProductCard';
import PaymentForm from './PaymentForm';
import { Row, Col, Layout, message, Typography } from 'antd';
import queryString from 'query-string';
import API, { baseUrl } from '../../utils/baseUrl';
import { ShopOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    const queries = queryString.parse(this.props.location.search);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      productId: this.props.match.params.productId,
      isOwnerShop: this.props.match.params.merchantId === this.props.loggedInUserId,
      product: null,
      merchant: null,
      qty: queries.qty,
    };
  }

  componentDidMount = () => {
    API.get(`api/product/get?id=${this.state.productId}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ product: res.data.product });
        } else {
          message.error({
            content: `Invalid product id of '${this.state.productId}'`,
            duration: 5,
          });
        }
      })
      .catch((err) => console.error(err));

    API.get('api/merchant/get?id=' + this.state.merchantId)
      .then((res) => {
        this.setState({ merchant: res.data.merchant });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { product, qty, merchantId, productId, merchant, isOwnerShop } = this.state;
    if (product == null || merchant == null) {
      // when product or merchant isn't populated yet
      return null;
    }

    let headerName;

    if (isOwnerShop) {
      headerName = 'My shop';
    } else {
      headerName = merchant.name;
    }

    const totalPrice = (product.price * qty).toFixed(2);
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', marginTop: '5vh' }}>
        <Row align="top" justify="space-between" style={{ margin: '0 0 50px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <Link to={'/'} style={{ color: '#828282' }}>
              <ShopOutlined /> {headerName}
            </Link>{' '}
            /
            <Link to={`/${merchantId}/product/${productId}`} style={{ color: '#828282' }}>
              {product.name}
            </Link>{' '}
            / Payment
          </Title>
        </Row>
        <Row align="middle">
          <Col lg={{ span: 12 }} span={24}>
            <PaymentProductCard
              imageUrl={`${baseUrl}${product.images[0]}`}
              qty={qty}
              price={product.price.toFixed(2)}
              title={product.name}
            />
          </Col>
          <Col lg={{ span: 12 }} span={24}>
            {/* TBC: shipping fee is not yet available in the backend, will set default as $2 */}
            <PaymentForm
              merchantId={merchantId}
              productId={productId}
              qty={qty}
              totalPrice={totalPrice}
              shippingFee={product.shippingFee || 2}
              history={this.props.history}
            />
          </Col>
        </Row>
      </Content>
    );
  }
}
