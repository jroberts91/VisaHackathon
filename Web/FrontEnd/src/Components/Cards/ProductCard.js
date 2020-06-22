import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Rate, Button, Alert, Modal } from 'antd';
import { LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import MaiYuGe from '../../images/maiyuge.jpg';
import { baseUrl } from '../../utils/baseUrl';
import QRCode from 'qrcode.react';

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
      isOwnerShop: this.props.isOwnerShop,
      copySuccess: false,
      copyFailure: false,
      isShowQR: false,
    };
  }

  componentDidMount = () => {};

  copyLinkToClipboard = (productLink) => {
    navigator.clipboard.writeText(productLink).then(
      () => {
        console.log('Copied');
        this.setState({
          copySuccess: true,
          copyFailure: false,
        });
      },
      () => {
        this.setState({
          copySuccess: false,
          copyFailure: true,
        });
      }
    );
  };

  showQRCode = () => {
    this.setState({ isShowQR: true });
  };

  hideQRCode = () => {
    this.setState({ isShowQR: false });
  };

  getActionList = (productLink, isOwnerShop) => {
    if (isOwnerShop) {
      return [
        <Button
          type="primary"
          style={{ backgroundColor: '#FAAA13' }}
          onClick={(event) => {
            event.preventDefault();
            this.copyLinkToClipboard(productLink);
          }}
        >
          <LinkOutlined />
          Copy
        </Button>,
        <Button
          type="primary"
          onClick={(event) => {
            event.preventDefault();
            this.showQRCode();
          }}
        >
          <QrcodeOutlined />
          QR Code
        </Button>,
        <Row>
          <Col span={12}>
            <Button style={{ width: '100%' }}>Edit</Button>
          </Col>
          <Col span={12}>
            <Button style={{ width: '100%' }}>Delete</Button>
          </Col>
        </Row>,
      ];
    }
    return [
      <Button
        type="primary"
        onClick={(event) => {
          event.preventDefault();
          this.copyLinkToClipboard(productLink);
        }}
      >
        <LinkOutlined />
        Copy
      </Button>,
      <Button
        type="primary"
        onClick={(event) => {
          event.preventDefault();
          this.showQRCode();
        }}
      >
        <QrcodeOutlined />
        QR Code
      </Button>,
    ];
  };

  render() {
    const { title, imageUrl, rating, productUrl, productId, merchantId, isOwnerShop } = this.state;

    const productLink = `/${merchantId}/product/${productId}`;
    const fullImageUrl = imageUrl ? baseUrl + imageUrl : undefined;

    return (
      <div>
        <Modal
          title="QR Code"
          visible={this.state.isShowQR}
          onCancel={this.hideQRCode}
          centered
          style={{ textAlign: 'center' }}
          footer={null}
        >
          <QRCode value={productLink} size={256} />
        </Modal>
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
        {this.state.copySuccess && <Alert message="Copied to Clipboard" type="success" showIcon closable />}
        {this.state.copyFailure && <Alert message="Error Copying to Clipboard" type="error" showIcon closable />}
      </div>
    );
  }
}
