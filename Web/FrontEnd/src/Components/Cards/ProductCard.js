import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Rate, Button, Alert, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import MaiYuGe from '../../images/maiyuge.jpg';
import { baseUrl } from '../../utils/baseUrl';

const { Meta } = Card;

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      imageUrl: this.props.imageUrl,
      rating: this.props.rating,
      productUrl: this.props.productUrl,
      merchantId: this.props.merchantId,
      productId: this.props.productId,
      isOwnerShop: this.props.isOwnerShop
    };
  }

  componentDidMount = () => { };

  copyLinkToClipboard = (productLink) => {
    navigator.clipboard.writeText(productLink).then(() => {
      message.success({
        content: `Successfully Copied to Clipboard!`,
        duration: 5,
      });
    }, () => {
      message.error({
        content: `Error Copying to Clipboard`,
        duration: 5,
      });
    })
  }

  getActionList = (productLink, isOwnerShop) => {
    if (isOwnerShop) {
      return ([
        <Button
          type="primary"
          style={{ backgroundColor: "#FAAA13" }}
          onClick={(event) => {
            event.preventDefault();
            this.copyLinkToClipboard(productLink);
          }}>
          <LinkOutlined />Copy
          </Button>,
        <Row>
          <Col span={12}>
            <Button style={{ width: '100%' }}>Edit</Button>
          </Col>
          <Col span={12}>
            <Button style={{ width: '100%' }}>Delete</Button>
          </Col>

        </Row>
      ])
    }
    return ([
      <Button
          type="primary"
          onClick={(event) => {
            event.preventDefault();
            this.copyLinkToClipboard(productLink);
          }}>
          <LinkOutlined />Copy
          </Button>
    ])
  }

  render() {
    const { title, imageUrl, rating, productUrl, productId, merchantId, isOwnerShop } = this.state;

    const productLink = `/${merchantId}/product/${productId}`
    const fullImageUrl = imageUrl ? baseUrl + imageUrl : undefined;
    
    return (
      <div>
        <Link to={productLink}>
          <Card
            style={{ width: '100%', minWidth: 250 }}
            cover={<img alt="example" src={fullImageUrl || MaiYuGe} />}
            hoverable
            tabBarExtraContent={<Rate value={rating} />}
            actions={this.getActionList(productUrl, isOwnerShop)}
          >
            <Meta title={title} description={<Rate value={this.props.rating} disabled />} />
          </Card>
        </Link>
      </div>
    );
  }
}
