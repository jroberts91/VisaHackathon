import React from 'react';

import { Row, Layout, Typography, Divider, message } from 'antd';
import MaiYuGe from '../../images/maiyuge.jpg';
import { defaultTheme } from '../../utils/theme';
import OrderSummaryTitleRow from './OrderSummaryTitleRow';
import OrderSummaryPrices from './OrderSummaryPrices';
import OrderSummaryContentRow from './OrderSummaryContentRow';

const { Content } = Layout;
const { Title } = Typography;

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: 'Tom Yum Fish',
        price: 13.3,
        imageUrl: MaiYuGe,
        shippingFee: 2,
      },
      qty: 1,
      isSuccessfulPaymentJustMade: true,
    };
  }

  componentDidMount = () => {
    const { isSuccessfulPaymentJustMade } = this.state;
    if (isSuccessfulPaymentJustMade) {
      message.success({
        content: `Successfully puchased! An copy of your order ${this.props.match.params.orderId} has been sent to your email.`,
        duration: 5,
      });
    }
  };

  render() {
    const { product, qty } = this.state;
    const totalPrice = product.price * qty;
    const totalPriceAndShipping = totalPrice + product.shippingFee;
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', marginTop: '40px' }}>
        <Title level={2}>Order Summary:</Title>
        <Row style={{ width: '90%', margin: '50px auto 0' }} justify="center" align="middle">
          <OrderSummaryTitleRow />
          <Divider style={{ borderTop: `1px solid ${defaultTheme.colors.secondary3}` }} />
          <OrderSummaryContentRow
            title={product.title}
            price={product.price.toFixed(2)}
            imageUrl={product.imageUrl}
            totalPrice={totalPrice.toFixed(2)}
            qty={qty}
          />
        </Row>
        <OrderSummaryPrices
          cartPrice={product.price.toFixed(2)}
          shippingFee={product.shippingFee.toFixed(2)}
          totalPrice={totalPriceAndShipping.toFixed(2)}
        />
      </Content>
    );
  }
}
