import React from 'react';
import { Form, Input, Button, Upload, Layout, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Content } = Layout;

const getFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

class ProductForm extends React.Component {
  render() {
    return (
      <div style={{ margin: '2%' }}>
        <h1 style={{ float: 'left' }}> Product Details </h1>
        <h1 style={{ color: 'red' }}> * </h1>

        <Form>
          <Form.Item rules={[{ required: true, message: 'Product Name is required' }]}>
            <Input style={{ width: 160 }} placeholder="Product Name" />
          </Form.Item>

          <Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Price and Quantity are required' }]}
              style={{ display: 'inline-block', width: 160 }}
            >
              <Input placeholder="Price" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: 'Price and Quantity are required' }]}
              style={{ display: 'inline-block', width: 160, margin: '0 20px' }}
            >
              <Input placeholder="Quantity" />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <TextArea placeholder="Description" autoSize={{ minRows: 5, maxRows: 6 }} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
    };
  }
  render() {
    return (
      <Content style={{ width: '95%', maxWidth: '1280px', margin: '0 auto', marginTop: '20vh' }}>
        <Row align="top">
          <Col lg={{ span: 8 }} span={24}>
            <Form.Item wrapperCol={{ span: 20 }}>
              <Form.Item style={{ margin: '0 auto' }} getValueFromEvent={getFile}>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload your product image</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col lg={{ span: 12 }} span={24}>
            <ProductForm></ProductForm>
          </Col>
        </Row>
      </Content>
    );
  }
}
