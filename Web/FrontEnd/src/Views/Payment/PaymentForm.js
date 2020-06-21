import React from 'react';
import { Form, Input, Typography, Button, Select, Row, Col } from 'antd';
import styled from 'styled-components';
import { defaultTheme } from '../../utils/theme';

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
    email: '${label} is not validate email',
    number: '${label} is not a validate number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const PayButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
  border-color: ${defaultTheme.colors.primary};
  margin-bottom: 0;
`;

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      country: '',
    };
  }
  render() {
    return (
      <Form {...layout} name="nest-messages" onFinish validateMessages={validateMessages}>
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
          name={['user', 'country']}
          label="Country"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input.Group>
            <Select style={{ width: '30%' }} defaultValue="Singapore">
              <Option value="Singapore">Singapore</Option>
              <Option value="Malaysia">Malaysia</Option>
              <Option value="Vietnam">Vietnam</Option>
              <Option value="Thailand">Thailand</Option>
            </Select>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name={['user', 'address']}
          label="Address"
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
          name={['user', 'postal']}
          label="Postal Code"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row align="middle" justify="center" style={{ marginLeft: '150px' }}>
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
