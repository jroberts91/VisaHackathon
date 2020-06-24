import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Rate, Button, message, Modal } from 'antd';
import { LinkOutlined, QrcodeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import MaiYuGe from '../../images/maiyuge.jpg';
import { baseUrl } from '../../utils/baseUrl';
import QRCode from 'qrcode.react';


const { Meta } = Card;

const ImageContainer = styled.div`
  position: relative;
`;

const StyledImage = styled.img`
  height: 200px; 
  width: 100%; 
  object-fit: cover;
`;

const StyledOverlay = styled.div`
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  font-size: 2em;
  color: #FFF;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 200px;
`;

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => { };

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

  getCoverImage = (fullImageUrl, isSoldOut) => {
    return (
      <ImageContainer>
        <StyledImage alt="example" src={fullImageUrl || MaiYuGe} />
        {
          isSoldOut &&
          <StyledOverlay>Sold Out</StyledOverlay>
        }
      </ImageContainer>
    );
  }

  render() {
    const { title, imageUrl, rating, productUrl, productId, merchantId, isOwnerShop, isSoldOut } = this.props;

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
            cover={this.getCoverImage(fullImageUrl, isSoldOut)}
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
