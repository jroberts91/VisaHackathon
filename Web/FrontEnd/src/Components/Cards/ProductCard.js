import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Rate, Button, message, Modal } from 'antd';
import { LinkOutlined, QrcodeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import MaiYuGe from '../../images/maiyuge.jpg';
import { baseUrl } from '../../utils/baseUrl';
import QRCode from 'qrcode.react';

const { Meta } = Card;

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  copyLinkToClipboard = (productLink) => {
    navigator.clipboard.writeText(productLink).then(
      () => {
        message.success({
          content: `Successfully Copied to Clipboard!`,
          duration: 5,
        });
      },
      () => {
        message.error({
          content: `Error Copying to Clipboard`,
          duration: 5,
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
          style={{ backgroundColor: '#fafafa', border: '0' }}
          onClick={(event) => {
            event.preventDefault();
            this.copyLinkToClipboard(productLink);
          }}
        >
          <LinkOutlined />
        </Button>,
        <Button
          style={{ backgroundColor: '#fafafa', border: '0' }}
          onClick={(event) => {
            event.preventDefault();
            this.showQRCode();
          }}
        >
          <QrcodeOutlined />
        </Button>,
        <Button style={{ backgroundColor: '#fafafa', border: '0' }}>
          <EditOutlined />
        </Button>,
        <Button style={{ backgroundColor: '#fafafa', border: '0' }}>
          <DeleteOutlined />
        </Button>,
      ];
    }
    return [
      <Button
        style={{ backgroundColor: '#fafafa', border: '0' }}
        onClick={(event) => {
          event.preventDefault();
          this.copyLinkToClipboard(productLink);
        }}
      >
        <LinkOutlined />
      </Button>,
      <Button
        style={{ backgroundColor: '#fafafa', border: '0' }}
        onClick={(event) => {
          event.preventDefault();
          this.showQRCode();
        }}
      >
        <QrcodeOutlined />
      </Button>,
    ];
  };

  render() {
    const { title, imageUrl, rating, productUrl, productId, merchantId, isOwnerShop } = this.props;

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
            cover={<img style={{ height: '200px', objectFit: 'cover' }} alt="example" src={fullImageUrl || MaiYuGe} />}
            hoverable
            tabBarExtraContent={<Rate value={rating} />}
            actions={this.getActionList(productUrl, isOwnerShop)}
          >
            <Meta title={title} description={<Rate value={this.props.rating || 5} disabled />} />
          </Card>
        </Link>
      </div>
    );
  }
}
