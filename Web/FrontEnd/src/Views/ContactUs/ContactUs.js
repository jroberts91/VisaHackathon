import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Row, Col, Layout, Typography, Select } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import image from '../../images/feedback.png';

const { TextArea } = Input;
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const StyledImage = styled.img`
  position: relative;
  width: 50%;
  height: 50%;
  margin: 10%;
`;

export default class AddProduct extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };

    return (
      <Content style={{ maxWidth: '1280px', width: '90%', margin: '0 auto' }}>
        <div style={{ margin: '0 auto', width: '100%' }}>
          <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
            <Title level={4} style={{ color: '#828282' }}>
              <MessageOutlined /> Contact Us
            </Title>
          </Row>

          <Form {...layout} ref={this.formRef}>
            <Row align="top">
              <Col lg={{ span: 12 }} span={24}>
                <Title level={4}> Any questions or feedback? </Title>

                <Form.Item label="I am a" rules={{ required: true }}>
                  <Select allowClear style={{ width: '40%' }}>
                    <Option value="buyer">Buyer</Option>
                    <Option value="seller">Seller</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Order ID">
                  <Input />
                </Form.Item>

                <Form.Item label="Full Name">
                  <Input />
                </Form.Item>

                <Form.Item label="Email Address" rules={[{ type: 'email' }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Message">
                  <TextArea autoSize={{ minRows: 6, maxRows: 10 }} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                  <Row>
                    <Col span={6} />
                    <Col span={18}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>

              <Col lg={{ span: 12 }} style={{ textAlign: 'center' }} span={24}>
                <StyledImage src={image} />
              </Col>
            </Row>
          </Form>
        </div>
      </Content>
    );
  }
}
