import React from 'react';
import { Card, Rate, Row, Col, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Title, Text } = Typography

const { Meta } = Card;

export default class MerchantDetail extends React.Component {
  getBody = (name, phone, address, rating) => {

    return (
      <div>
        <Row gutter={[32, 32]}>
          <Col key={0} xs={12} sm={8} md={8} lg={8} span={8}>
            <Title level={4} style={{fontSize: "18px"}}>Merchant Name:</Title>
            <Text style={{fontSize: "18px"}}>{ name }</Text>
          </Col>

          <Col key={1} xs={12} sm={8} md={8} lg={8} span={8}>
            <Title level={4} style={{fontSize: "18px"}}>Telephone:</Title>
            <Text style={{fontSize: "18px"}}>{ phone || "No Number Provided" }</Text>
          </Col>

          <Col key={2} xs={12} sm={8} md={8} lg={8} span={8}>
            <Title level={4} style={{fontSize: "18px"}}>Address:</Title>
            <Text style={{fontSize: "18px"}}>{ address || "No Address Provided" }</Text>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col key={0} span={12}>
            <Title level={4} style={{fontSize: "18px"}}>Rating:</Title>
            <Rate value={rating} disabled />
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    const { name, phone, address, rating } = this.props;
    return (
      <Card
        style={{ width: '80%', margin: '0 auto', height: '80%'}}
        hoverable
      >
        <Meta
          title={<Title style={{fontSize: "20px"}}>Merchant Info</Title>}
          description={this.getBody(name, phone, address, rating)} />
      </Card>
    );
  }
}