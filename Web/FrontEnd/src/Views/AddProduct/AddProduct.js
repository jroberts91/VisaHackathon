import React from 'react';
import { Form, Input, Button, Upload, Row, Col, Layout, Typography } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import API from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Dragger } = Upload;
const { Content } = Layout;
const { Title } = Typography;
const validateMessages = {
  required: 'This field is required.',
};

export default class AddProduct extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      merchantName: ''
    };
  }

  getMerchantNameFromApi = (merchantId) => {
    API.get('api/merchant/get?id=' + merchantId)
      .then((res) => {
        this.setState({ merchantName: res.data.merchant.name });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {
    this.getMerchantNameFromApi(this.state.merchantId);
  };

  render() {
    let formData = new FormData();

    const handleUpload = (info) => {
      formData.append('files', info.file);
    };

    const handleCreate = (values) => {
      const { name, price, quantity, description } = values.pdt;

      const body = {
        name: name,
        description: description,
        price: price,
        totalQty: quantity,
        merchantId: this.state.merchantId,
      };

      for (var key in body) {
        formData.append(key, body[key]);
      }

      const config = {
        header: { 'content-type': 'multipart/form-data' },
      };
      API.post('api/product/create', formData, config)
        .then((res) => {
          this.props.history.push({
            pathname: `/${this.state.merchantId}`,
          });
        })
        .catch((err) => console.log('error adding product'));
    };

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <Link to={'/'} style={{ color: '#828282' }}>
              <HomeOutlined />
            </Link>{' '}
            / <UserOutlined /> {this.state.merchantName}
          </Title>
        </Row>

        <Form ref={this.formRef} validateMessages={validateMessages} onFinish={handleCreate}>
          <Row align="top">
            <Col lg={{ span: 12 }} span={24}>
              <Form.Item name={['pdt', 'images']} wrapperCol={{ span: 20 }} style={{ margin: '0 auto' }}>
                <Dragger onChange={handleUpload} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload product image</p>
                  <p className="ant-upload-hint">Maximum of 4 images only.</p>
                </Dragger>
              </Form.Item>
            </Col>

            <Col lg={{ span: 12 }} span={24}>
              <h1 style={{ float: 'left' }}> Product Details </h1>
              <h1 style={{ color: 'red' }}> * </h1>

              <Form.Item name={['pdt', 'name']} rules={[{ required: true }]}>
                <Input style={{ width: 160 }} placeholder="Product Name" />
              </Form.Item>

              <Form.Item>
                <Form.Item
                  name={['pdt', 'price']}
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 160 }}
                >
                  <Input placeholder="Price" />
                </Form.Item>

                <Form.Item
                  name={['pdt', 'quantity']}
                  rules={[{ required: true }]}
                  style={{ display: 'inline-block', width: 160, margin: '0 20px' }}
                >
                  <Input placeholder="Quantity" />
                </Form.Item>
              </Form.Item>

              <Form.Item name={['pdt', 'description']}>
                <TextArea placeholder="Description" autoSize={{ minRows: 5, maxRows: 6 }} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

      </Content>
    );
  }
}
