import React from 'react';

import PaymentProductCard from '../../Components/Cards/PaymentProductCard';
import PaymentForm from './PaymentForm';
import { Row, Col, Layout, message } from 'antd';
import queryString from 'query-string';
import API, { baseUrl } from '../../utils/baseUrl';

const { Content } = Layout;

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    const queries = queryString.parse(this.props.location.search);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      productId: this.props.match.params.productId,
      product: null,
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
  };

  render() {
    const { product, qty, merchantId, productId } = this.state;
    if (product == null) {
      // when product isn't populated yet
      return null;
    }
    const totalPrice = (product.price * qty).toFixed(2);
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', marginTop: '20vh' }}>
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
