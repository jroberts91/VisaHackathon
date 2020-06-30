import React from 'react';
import { Form, Input, Typography, Button, Select, Row, Col, message } from 'antd';
import styled from 'styled-components';
import { defaultTheme } from '../../utils/theme';
import API from '../../utils/baseUrl';
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

export default class CheckoutPaymentForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      showCheckoutPage: false,
    }
  }

  componentDidMount = () => {
    this.onVisaCheckoutReady();
  }

  componentWillUnmount = () => {
    document.getElementById('checkoutButton').style.display = "none";
  }
  onVisaCheckoutReady = () => {
    window.V.init({
      apikey: "8XLNBQZUQJFZIFGKCH2P21Koq6pvrOmJc17tWwTsNRQVx_e0o",
      paymentRequest: {
        currencyCode: "SGD",
        subtotal: "10.00",
        dataLevel: 'FULL'
      }
    });
    window.V.on("payment.success", this.handlePaymentSuccess);
    window.V.on("payment.cancel", function (payment) {
      console.log("payment.cancel: \n" + JSON.stringify(payment));
    });
    window.V.on("payment.error", function (payment, error) {
      console.log("payment.error: \n" +
        JSON.stringify(payment) + "\n" +
        JSON.stringify(error));
    });
  }
  handlePaymentSuccess = () => {
    console.log(this.state.formData)
    API.post('api/payment/direct', this.state.formData)
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
  }


  render() {
    const handleNext = (values) => {
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
        },
      };
      this.setState({ formData: data, showCheckoutPage: true });
      document.getElementById('checkoutButton').style.display = "flex";
    };
    return (
      <>
        {
          !this.state.showCheckoutPage &&
          <Form
            {...layout}
            ref={this.formRef}
            name="nest-messages"
            onFinish={handleNext}
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
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={['user', 'lastName']}
                  label="Last Name"
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
                    Next
              </PayButton>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }
      </>
    );
  }
}
