import React from 'react';
import { Form, Input, Button, Upload, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import API from '../../utils/baseUrl';

const { TextArea } = Input;
const { Dragger } = Upload;
const validateMessages = {
  required: 'This field is required.',
};


export default class AddProduct extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
    };
  }

  render() {
    let formData = new FormData();
    const merchantId = this.state.merchantId;

    const handleUpload= (info)=> {
      formData.append("files",info.file)
    };

    const handleCreate = (values) => {
      const { name, price, quantity, description } = values.pdt;
      
      const body = {
        name: name,
        description: description,
        price: price,
        totalQty: quantity,
        merchantId: merchantId,
      };

      for ( var key in body ) {
        formData.append(key, body[key]);
      }
      
      console.log(formData)
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      }
      API.post('api/product/create', formData, config)
        .then((res) => {
          this.props.history.push({
            pathname: `/${merchantId}`,
          });
        })
        .catch((err) => console.log('error adding product'));
    };

    return (
      <Form
        ref={this.formRef}
        validateMessages={validateMessages}
        onFinish={handleCreate}
        style={{ width: '95%', maxWidth: '1280px', margin: '0 auto', marginTop: '20vh' }}
      >
        <Row align="top">
          <Col lg={{ span: 8 }} span={24}>

            <Form.Item name={['pdt', 'images']} wrapperCol={{ span: 20 }} style={{ margin: '0 auto' }}>
              <Dragger onChange={handleUpload} beforeUpload={() => false}>
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area to upload product image</p>
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
    );
  }
}
