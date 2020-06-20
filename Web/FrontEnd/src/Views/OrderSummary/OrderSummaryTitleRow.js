import React from 'react';

import { Col, Typography } from 'antd';
const { Title } = Typography;

export default class OrderSummaryTitleRow extends React.Component {
  render() {
    return (
      <>
        <Col span={6} align="center">
          <Title level={4}>Product</Title>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>Price</Title>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>Quantity</Title>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>Total Price</Title>
        </Col>
      </>
    );
  }
}
