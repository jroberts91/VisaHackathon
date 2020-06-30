import React from 'react';
import { Form, Input, Typography, Button, Select, Row, Col, message } from 'antd';
import styled from 'styled-components';
import { defaultTheme } from '../../utils/theme';
import API from '../../utils/baseUrl';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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

export default class PaymentForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      cardNumber: '',
      cvv: '',
      expiry: '',
      cardFocused: '',
    };
  }

  render() {
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
        <Row>
          <Col span={12}>
            <Form.Item
              name={['user', 'firstName']}
              label="First Name"
              rules={[
                {
                  required: true,
                },
              ]}
              validateTrigger="onSubmit"
              getValueFromEvent={(event) => {
                this.setState({ firstName: event.target.value });
                this.setState({ cardFocused: 'name' });
                return event.target.value;
              }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'lastName']}
              label="Last Name"
              validateTrigger="onSubmit"
              getValueFromEvent={(event) => {
                this.setState({ lastName: event.target.value });
                this.setState({ cardFocused: 'name' });
                return event.target.value;
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={['user', 'email']}
              label="Email"
              validateTrigger="onSubmit"
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'phoneNumber']}
              label="Phone No"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={['user', 'address']}
              label="Address"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={['user', 'postal']}
              label="Postal Code"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['user', 'country']}
              label="Country"
              validateTrigger="onSubmit"
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
          </Col>
        </Row>

        <Row style={{ marginBottom: '20px' }}>
          <Col span={10}>
            <Form.Item
              name={['card', 'number']}
              label="Card No"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                },
              ]}
              getValueFromEvent={(event) => {
                this.setState({ cardNumber: event.target.value });
                this.setState({ cardFocused: 'number' });
                return event.target.value;
              }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name={['card', 'cvv']}
              label="CVV"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  pattern: new RegExp('^[0-9]{3,4}$'),
                  //        pattern: new RegExp('/^[0-9]{3,4}$/'),
                  message: 'CVV is the 3/4 digit number on the back of your Visa card.',
                },
              ]}
              getValueFromEvent={(event) => {
                this.setState({ cvv: event.target.value });
                this.setState({ cardFocused: 'cvc' });
                return event.target.value;
              }}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name={['card', 'expiry']}
              label="Expiry"
              validateTrigger="onSubmit"
              rules={[
                {
                  required: true,
                  pattern: new RegExp('^[0-9]{3,4}$'),
                  //        pattern: new RegExp('/^[0-9]{3,4}$/'),
                  message: 'CVV is the 3/4 digit number on the back of your Visa card.',
                },
              ]}
              getValueFromEvent={(event) => {
                this.setState({ expiry: event.target.value });
                this.setState({ cardFocused: 'expiry' });
                return event.target.value;
              }}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Cards
          issuer={'visa'}
          focused={this.state.cardFocused}
          acceptedCards={['visa']}
          preview={true}
          cvc={this.state.cvv}
          name={`${this.state.firstName} ${this.state.lastName}`}
          number={this.state.cardNumber}
          expiry={this.state.expiry}
        />
        <Row align="middle" justify="center" style={{ marginLeft: '150px', marginTop: '30px' }}>
          <Col span={12} align="center">
            <Text
              strong
              style={{ fontSize: '18px' }}
            >{`Total: $${this.props.totalPrice} + $${this.props.shippingFee} shipping`}</Text>
          </Col>
          <Col span={12} align="center">
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
