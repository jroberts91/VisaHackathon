import React from 'react';

import PaymentProductCard from '../../Components/Cards/PaymentProductCard';
import PaymentForm from './PaymentForm';
import { Row, Col, Layout, Select, Typography } from 'antd';
import MaiYuGe from '../../images/maiyuge.jpg';

const { Content } = Layout;
const { Text, Title } = Typography;

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: 'Tom Yum Fish',
        price: 13.3,
        imageUrl: MaiYuGe,
        shippingFee: 2.0,
      },
      qty: 1,
    };
  }

  componentDidMount = () => {};

  render() {
    const { product, qty } = this.state;
    const totalPrice = (product.price * qty).toFixed(2);
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', marginTop: '20vh' }}>
        <Row align="middle">
          <Col lg={{ span: 12 }} span={24}>
            <PaymentProductCard
              imageUrl={product.imageUrl}
              qty={qty}
              price={product.price.toFixed(2)}
              title={product.title}
            />
          </Col>
          <Col lg={{ span: 12 }} span={24}>
            <PaymentForm totalPrice={totalPrice} shippingFee={product.shippingFee} />
          </Col>
        </Row>
      </Content>
    );
  }
}
