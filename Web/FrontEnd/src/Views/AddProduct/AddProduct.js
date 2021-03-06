import React from 'react';
import { Form, Input, Button, Upload, Row, Col, Layout, Typography, InputNumber, message } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
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
      merchantName: '',
      imgUrls: [],
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
    const { imgUrls } = this.state;

    const handleUpload = (info) => {
      if (info.fileList.length <= 4) {
        formData.delete('files');
        for (var value of info.fileList) {
          formData.append('files', value.originFileObj);
        }
      } else {
        info.fileList.slice(0, 4);
        message.error({ content: 'You have more than 4 Images, only first 4 files will be uploaded.', duration: 5 });
      }
    };

    const handleCreate = (values) => {
      const { name, price, quantity, description, deliveryDays } = values.pdt;

      const body = {
        name: name,
        description: description,
        price: price,
        totalQty: quantity,
        deliveryDays: deliveryDays,
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

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <Link to={`/${this.state.merchantId}`} style={{ color: '#828282' }}>
              <ShopOutlined /> My Shop
            </Link>{' '}
            / Add Product
          </Title>
        </Row>

        <Form {...layout} ref={this.formRef} validateMessages={validateMessages} onFinish={handleCreate}>
          <Row align="top">
            <Col lg={{ span: 12 }} span={24}>
              <Form.Item name={['pdt', 'images']} wrapperCol={{ span: 20 }}>
                <Dragger multiple={true} onChange={handleUpload} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload product image</p>
                  <p className="ant-upload-hint">Maximum of 4 images only.</p>
                </Dragger>
              </Form.Item>
            </Col>

            <Col lg={{ span: 12 }} span={24}>
              <Title level={2}> Product Details </Title>
              <Form.Item label="Product Name" name={['pdt', 'name']} rules={[{ required: true }]}>
                <Input style={{ width: '60%' }} placeholder="Visa Herschel Bag" />
              </Form.Item>

              <Form.Item label="Price" name={['pdt', 'price']} rules={[{ required: true }]}>
                <InputNumber placeholder="179.50" style={{ width: '60%' }} />
              </Form.Item>

              <Form.Item label="Quantity" name={['pdt', 'quantity']} rules={[{ required: true }]}>
                <InputNumber placeholder="5" style={{ width: '60%' }} />
              </Form.Item>

              <Form.Item label="Delivery in Days" name={['pdt', 'deliveryDays']} rules={[{ required: true }]}>
                <InputNumber placeholder="7" style={{ width: '60%' }} />
              </Form.Item>

              <Form.Item label="Description" name={['pdt', 'description']}>
                <TextArea
                  placeholder="Visa-exclusive bag. Visa is the best!"
                  autoSize={{ minRows: 5, maxRows: 6 }}
                  style={{ width: '100%' }}
                />
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
