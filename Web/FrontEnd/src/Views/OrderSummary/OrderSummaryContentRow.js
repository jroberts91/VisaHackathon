import React from 'react';

import { Col, Typography, Card } from 'antd';
const { Title } = Typography;
const { Meta } = Card;

export default class OrderSummaryContentRow extends React.Component {
  render() {
    const { imageUrl, title, price, qty, totalPrice } = this.props;
    return (
      <>
        <Col span={6} align="center">
          <Card style={{ width: '80%' }} cover={<img alt="example" src={imageUrl} />}>
            <Meta description={title} />
          </Card>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>{`$${price}`}</Title>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>{`${qty}`}</Title>
        </Col>
        <Col span={6} align="center">
          <Title level={4}>{`$${totalPrice}`}</Title>
        </Col>
      </>
    );
  }
}
