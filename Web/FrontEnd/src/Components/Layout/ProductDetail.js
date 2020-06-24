import React from 'react';
import styled from 'styled-components';
import { Card, Rate, Row, Col, Button, InputNumber, Progress, Modal, message } from 'antd';
import { LinkOutlined, QrcodeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { defaultTheme } from '../../utils/theme';

const { Meta } = Card;

const WhiteButton = styled(Button)`
  background: white;
  border: 0;
  font-size: 1.2em;
`;

const BlueButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
  border-color: ${defaultTheme.colors.primary};
  margin-bottom: 0;
`;

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  componentDidMount = () => {};

  checkQuantity = (remainingQty) => {
    if (this.state.quantity === '' || this.state.quantity === null || remainingQty <= 0) {
      return true;
    }
    return false;
  };

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

  getQtyPerecent = (qtySold, totalQty) => {
    return (qtySold / totalQty) * 100;
  };

  getTitle = (name, rating) => {
    return (
      <Row gutter={[32, 32]}>
        <Col style={{ fontSize: '1.2em' }} key={0} xs={24} md={24} lg={12} span={12}>
          {name}
        </Col>
        <Col key={1} xs={24} md={24} lg={12} span={12}>
          <Rate value={rating || 5} disabled />
        </Col>
      </Row>
    );
  };

  getBody = (description, price, totalQty, qtySold, quantity, paymentLink) => {
    qtySold = qtySold || 0;
    totalQty = totalQty || 0;

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
          <QRCode value={paymentLink} size={256} />
        </Modal>
        <Row gutter={[32, { sm: 64, md: 80, lg: 96 }]}>
          <Col span={24}>{description || 'No Description Provided'}</Col>
        </Row>
        <Row gutter={[0, { sm: 48, md: 64, lg: 80 }]}>${(price || 0).toFixed(2)}</Row>
        <Row gutter={[32, { sm: 48, md: 64, lg: 80 }]}>
          <Col style={{ fontSize: '1.2em' }} key={0} span={8}>
            Quantity:{' '}
            <InputNumber
              style={{ width: '52px' }}
              min={1}
              value={this.state.quantity}
              max={totalQty - qtySold}
              onChange={(value) => {
                this.setState({ quantity: value })
              }}
            />
          </Col>
          <Col key={1} span={16}>
            <Progress
              style={{ width: '70%', fontSize: '1em' }}
              size="small"
              percent={this.getQtyPerecent(qtySold, totalQty)}
              format={() => `${qtySold}/${totalQty} sold`}
            />
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col key={2} span={12} style={{ fontSize: '1.1em', color: '#1A1F71' }}>
            Share:&nbsp;&nbsp;
            <WhiteButton onClick={() => this.copyLinkToClipboard(paymentLink)}>
              <LinkOutlined />
            </WhiteButton>
            <WhiteButton onClick={() => this.setState({ isShowQR: true })}>
              <QrcodeOutlined />
            </WhiteButton>
          </Col>
          <Col key={1} span={12}>
            <Link
              style={{ float: 'right', marginRight: '20%' }}
              to={paymentLink + '/payment?qty=' + this.state.quantity}
            >
              <BlueButton type="primary" disabled={this.checkQuantity(totalQty - qtySold)}>
                Buy Now
              </BlueButton>
            </Link>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { name, rating, description, price, totalQty, qtySold, paymentLink } = this.props;
    const { quantity } = this.state;

    return (
      <Card style={{ width: '95%', marginLeft: '5%' }} hoverable>
        <Meta
          title={this.getTitle(name, rating)}
          description={this.getBody(description, price, totalQty, qtySold, quantity, paymentLink)}
        />
      </Card>
    );
  }
}
