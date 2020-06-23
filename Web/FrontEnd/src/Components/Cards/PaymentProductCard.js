import React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Title } = Typography;
const { Meta } = Card;

class PaymentProductDetails extends React.Component {
  render() {
    return (
      <>
        <div>{`$${this.props.price}`}</div>
        <div>{`Quantity: ${this.props.qty}`}</div>
      </>
    );
  }
}

export default class PaymentProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      imageUrl: this.props.imageUrl,
      price: this.props.price,
      qty: this.props.qty,
    };
  }

  componentDidMount = () => {};

  render() {
    const { imageUrl, title, price, qty } = this.state;
    return (
      <Card
        style={{ width: '80%', minWidth: 500, margin: '0 auto' }}
        cover={<img alt="example" src={imageUrl} />}
        hoverable
      >
        <Meta
          title={<Title level={3}>{title}</Title>}
          description={<PaymentProductDetails price={price} qty={qty} />}
          style={{ textAlign: 'center' }}
        />
      </Card>
    );
  }
}
