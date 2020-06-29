import React from 'react';
import { Form, Input, Typography, Button, Select, Row, Col, message, Alert } from 'antd';
import styled from 'styled-components';
import { defaultTheme } from '../../utils/theme';
import API from '../../utils/baseUrl';

const { Option } = Select;
const { Text } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required',
  types: {
    email: '${label} is not valid email',
    number: '${label} is not a valid number',
  },
};

const PayButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
  border-color: ${defaultTheme.colors.primary};
  margin-bottom: 0;
`;

const StyledAlerts = styled(Alert)``;

export default class PaymentForm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      offerError: false,
      totalPrice: this.props.totalPrice,
    };
  }

  componentDidMount = () => {
    this.getMerchantOffers();
  };

  test = (item) => {
    const { offers } = this.state;
    const currentOffer = offers[item];
    if (this.props.totalPrice > currentOffer.minValue) {
      this.setState({ offerError: false, totalPrice: this.props.totalPrice - currentOffer.value });
    } else {
      this.setState({ offerError: true, totalPrice: this.props.totalPrice, offerMinValue: currentOffer.minValue });
    }
  };

  getMerchantOffers = () => {
    API.get(`api/offers/visell/getByMerchant?merchantId=${this.props.merchantId}`)
      .then((res) => {
        console.log(res.data.offers);
        this.setState({ offers: res.data.offers });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { offers, totalPrice, offerError, offerMinValue } = this.state;
    const handlePay = (values) => {
      const { number, cvv } = values.card;
      const { address, country, postal, email, firstName, lastName, phoneNumber } = values.user;
      const data = {
        order: {
          merchantId: this.props.merchantId,
          product: this.props.productId,
          quantity: this.props.qty,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
        },
        payment: {
          country: country,
          postal: postal,
          firstName: firstName,
          lastName: lastName,
          creditCardNumber: number,
          cvv: cvv,
        },
      };
      API.post('api/payment/direct', data)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            const { orderId } = res.data;
            // successful payment, direct user to order summary page
            this.props.history.push({
              pathname: `/order/${orderId}`,
              state: { isSuccessfulPaymentJustMade: true },
            });
            // TODO: send order email to customer
          } else {
            message.error({
              content: `Error occurred when trying to pay for the item, please ensure you entered the correct Visa credentials.`,
              duration: 5,
            });
          }
        })
        .catch((err) => console.error(err));
    };
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="nest-messages"
        onFinish={handlePay}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'firstName']}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'lastName']}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'phoneNumber']}
          label="Phone Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'country']}
          label="Country"
          initialValue="Singapore"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: 'max(30%, 200px)' }}>
            <Option value="Singapore">Singapore</Option>
            <Option value="Malaysia">Malaysia</Option>
            <Option value="Vietnam">Vietnam</Option>
            <Option value="Thailand">Thailand</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['user', 'address']}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'postal']}
          label="Postal Code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['card', 'number']}
          label="Credit Card No"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['card', 'cvv']}
          label="CVV number"
          rules={[
            {
              required: true,
              pattern: new RegExp('^[0-9]{3,4}$'),
              //        pattern: new RegExp('/^[0-9]{3,4}$/'),
              message: 'CVV is the 3/4 digit number on the back of your Visa card.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {offerError && (
          <StyledAlerts message={`Did not reach min value of $${offerMinValue} w/o delivery`} type="error" showIcon />
        )}
        <Form.Item label="Offers">
          <Select onSelect={this.test}>
            {offers.map((item, index) => {
              return <Option value={index}> {item.offerName} </Option>;
            })}
          </Select>
        </Form.Item>
        <Row align="middle" justify="right" style={{ marginLeft: '150px' }}>
          <Col span={18} align="left">
            <Text
              strong
              style={{ fontSize: '18px' }}
            >{`Total: $${totalPrice} + $${this.props.shippingFee} delivery`}</Text>
          </Col>
          <Col span={18} align="left">
            <Text strong style={{ fontSize: '18px' }}>{`= $${
              parseFloat(totalPrice) + parseFloat(this.props.shippingFee)
            }`}</Text>
          </Col>
          <Col span={12} align="left">
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} noStyle>
              <PayButton type="primary" htmlType="submit">
                Pay via Visa
              </PayButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
