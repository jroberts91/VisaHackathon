import React from 'react';

import { Row, Col, Typography } from 'antd';
const { Title } = Typography;

export default class OrderSummaryPrices extends React.Component {
  render() {
    const { cartPrice, shippingFee, totalPrice } = this.props;
    return (
      <>
        <Row justify="end">
          <Col span={4}>
            <Title level={4}>Cart total</Title>
          </Col>
          <Col span={6}>
            <Title level={4}>${cartPrice}</Title>
          </Col>
        </Row>
        <Row justify="end">
          <Col span={4}>
            <Title level={4}>Shipping total</Title>
          </Col>
          <Col span={6}>
            <Title level={4}>${shippingFee}</Title>
          </Col>
        </Row>
        <Row justify="end">
          <Col span={4}>
            <Title level={4}>Total</Title>
          </Col>
          <Col span={6}>
            <Title level={4}>${totalPrice}</Title>
          </Col>
        </Row>
      </>
    );
  }
}
