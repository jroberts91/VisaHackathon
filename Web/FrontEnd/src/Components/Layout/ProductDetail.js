import React from 'react';
import { Card, Rate, Row, Col, Button, InputNumber, Progress } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  componentDidMount = () => {};

  checkQuantity = () => {
    if (this.state.quantity === '' || this.state.quantity === null) {
      return true;
    }
    return false;
  };

  getQtyPerecent = (qtySold, totalQty) => {
    return (qtySold / totalQty) * 100;
  };

  getTitle = (name, rating) => {
    return (
      <Row gutter={[32, 32]}>
        <Col style={{ fontSize: '1.2em' }} key={0} xs={24} md={24} lg={12} span={12}>
          {name}
        </Col>
        <Col key={1} xs={24} md={24} lg={12} span={12}>
          <Rate value={rating} disabled />
        </Col>
      </Row>
    );
  };

  getBody = (description, price, totalQty, qtySold, quantity, paymentLink) => {
    qtySold = qtySold || 0;
    totalQty = totalQty || 0;

    return (
      <div>
        <Row gutter={[32, { sm: 64, md: 80, lg: 96 }]}>
          <Col span={24}>{description || 'No Description Provided'}</Col>
        </Row>
        <Row gutter={[0, { sm: 48, md: 64, lg: 80 }]}>${(price || 0).toFixed(2)}</Row>
        <Row gutter={[32, { sm: 48, md: 64, lg: 80 }]}>
          <Col style={{ fontSize: '1.2em' }} key={0} span={8}>
            Quantity:{' '}
            <InputNumber
              style={{ width: '52px' }}
              min={1}
              defaultValue={quantity}
              onChange={(value) => this.setState({ quantity: value })}
            />
          </Col>
          <Col key={1} span={16}>
            <Progress
              style={{ width: '70%', fontSize: '1em' }}
              size="small"
              percent={this.getQtyPerecent(qtySold, totalQty)}
              format={() => `${qtySold}/${totalQty} sold`}
            />
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Link style={{ margin: 'auto' }} to={paymentLink + '?qty=' + this.state.quantity}>
            <Button primary style={{ color: 'white', backgroundColor: '#1a1f71' }} disabled={this.checkQuantity()}>
              Buy Now
            </Button>
          </Link>
        </Row>
      </div>
    );
  };

  render() {
    const { name, rating, description, price, totalQty, qtySold, paymentLink } = this.props;
    const { quantity } = this.state;

    return (
      <Card style={{ width: '95%', marginLeft: '5%' }} hoverable>
        <Meta
          title={this.getTitle(name, rating)}
          description={this.getBody(description, price, totalQty, qtySold, quantity, paymentLink)}
        />
      </Card>
    );
  }
}
