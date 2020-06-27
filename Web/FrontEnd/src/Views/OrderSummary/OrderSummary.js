import React from 'react';

import { Row, Layout, Typography, Divider, message } from 'antd';
import { defaultTheme } from '../../utils/theme';
import OrderSummaryTitleRow from './OrderSummaryTitleRow';
import OrderSummaryPrices from './OrderSummaryPrices';
import OrderSummaryContentRow from './OrderSummaryContentRow';
import API, { baseUrl } from '../../utils/baseUrl';

const { Content } = Layout;
const { Title } = Typography;

export default class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      // only available when successful payment routes to order summary page
      // added null check to access order summary from email
      isSuccessfulPaymentJustMade: this.props.location.state != null ? this.props.location.state.isSuccessfulPaymentJustMade || false : false,
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

    API.get(`api/order/get?orderId=${this.props.match.params.orderId}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ order: res.data.order });
        } else {
          message.error({
            content: `Invalid order id ${this.props.match.params.orderId}.`,
            duration: 5,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { order } = this.state;
    if (order == null) {
      // haven't populate order yet
      return null;
    }
    const { product, quantity } = order;
    const totalPrice = product.price * quantity;
    const totalPriceAndShipping = totalPrice + (product.shippingFee || 2); // product shipping fee is not available yet, using default val
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%', marginTop: '40px' }}>
        <Title level={2}>Order Summary:</Title>
        <Row style={{ width: '90%', margin: '50px auto 0' }} justify="center" align="middle">
          <OrderSummaryTitleRow />
          <Divider style={{ borderTop: `1px solid ${defaultTheme.colors.secondary3}` }} />
          <OrderSummaryContentRow
            title={product.name}
            price={product.price.toFixed(2)}
            imageUrl={`${baseUrl}${product.images[0]}`}
            totalPrice={totalPrice.toFixed(2)}
            qty={quantity}
          />
        </Row>
        <OrderSummaryPrices
          cartPrice={product.price.toFixed(2)}
          shippingFee={(product.shippingFee || 2).toFixed(2)}
          totalPrice={totalPriceAndShipping.toFixed(2)}
        />
      </Content>
    );
  }
}
