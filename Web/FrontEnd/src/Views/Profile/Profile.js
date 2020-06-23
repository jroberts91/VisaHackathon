import React from 'react';
import styled from 'styled-components';
import { Row, Col, Layout, Typography, message, Empty, Radio, Input, Button } from 'antd';
import API from '../../utils/baseUrl';

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const ModeContainer = styled.div`
  position: absolute;
  top: max(100px, 10%);
  right: 10%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: min(50px, 10%);
  right: 50%;
  transform: translate(50%, 0);
`;

class LeftProfileSection extends React.Component {
  render() {
    const { imageUrl, mode } = this.props;

    return (
      <Col>
        <Row span={24} justify="center" style={{ marginBottom: '50px' }}>
          {imageUrl ? <img src={imageUrl} /> : <Empty description="no profile image" />}
        </Row>
      </Col>
    );
  }
}

class RightProfileSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, description, email, address, phoneNumber, cardNumber, mode } = this.props;
    const {
      editedName,
      editedDescription,
      editedEmail,
      editedAddress,
      editedPhoneNumber,
      editedCardNumber,
      onChangeName,
      onChangeEmail,
      onChangeDescription,
      onChangeAddress,
      onChangeCardNumber,
      onChangePhoneNumber,
    } = this.props;

    return (
      <Col>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Store Name:</Col>
          <Col span={16}>{mode === 'view' ? name : <Input value={editedName} onChange={onChangeName} />}</Col>
        </Row>
        <Row span={24} style={{ minHeight: '100px' }}>
          <Col span={8}>Store Description:</Col>
          <Col span={16}>
            {mode === 'view' ? description : <TextArea value={editedDescription} onChange={onChangeDescription} />}
          </Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Email:</Col>
          <Col span={16}>{mode === 'view' ? email : <Input value={editedEmail} onChange={onChangeEmail} />}</Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Address:</Col>
          <Col span={16}>{mode === 'view' ? address : <Input value={editedAddress} onChange={onChangeAddress} />}</Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Contact Number:</Col>
          <Col span={16}>
            {mode === 'view' ? phoneNumber : <Input value={editedPhoneNumber} onChange={onChangePhoneNumber} />}
          </Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Card Number:</Col>
          <Col span={16}>
            {mode === 'view' ? cardNumber : <Input value={editedCardNumber} onChange={onChangeCardNumber} />}
          </Col>
        </Row>
      </Col>
    );
  }
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      name: '',
      email: '',
      description: '',
      profileImage: '',
      phoneNumber: '',
      address: '',
      cardNumber: '',
      isMounted: false,
      mode: 'view',
      editedName: '',
      editedEmail: '',
      editedDescription: '',
      editedPhoneNumber: '',
      editedCardNumber: '',
      editedAddress: '',
    };
  }

  componentDidMount = () => {
    API.get(`api/merchant/get?id=${this.state.merchantId}`)
      .then((res) => {
        if (res.status === 200) {
          const { name, email, description, profileImage, address, phoneNumber, cardNumber } = res.data.merchant;
          this.setState({
            name: name,
            email: email,
            description: description,
            profileImage: profileImage,
            address: address,
            phoneNumber: phoneNumber,
            cardNumber: cardNumber,
          });

          // initialize edited fields as the same value
          this.setState({
            editedName: name,
            editedEmail: email,
            editedDescription: description,
            editedAddress: address,
            editedPhoneNumber: phoneNumber,
            editedCardNumber: cardNumber,
          });
        } else {
          message.error({
            content: `Invalid user id of ${this.state.merchantId}`,
            duration: 5,
          });
        }
        this.setState({ isMounted: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleUpdateProfile = () => {
    // TODO: call update api and set the original values as updated values
  };

  render() {
    const { name, email, description, profileImage, phoneNumber, cardNumber, address, isMounted, mode } = this.state;
    const {
      editedName,
      editedDescription,
      editedEmail,
      editedAddress,
      editedPhoneNumber,
      editedCardNumber,
    } = this.state;
    if (!isMounted) {
      return null;
    }

    // check if logged in user is in fact the merchant
    if (isMounted && this.props.loggedInUserId !== this.props.match.params.merchantId) {
      message.warning({
        content: 'You are not allowed to access this profile as you are not logged in as the owner',
        duration: 5,
      });
      return null;
    }

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <ModeContainer>
          <Text strong style={{ marginRight: '10px' }}>
            Mode:
          </Text>
          <Radio.Group onChange={(e) => this.setState({ mode: e.target.value })} value={this.state.mode}>
            <Radio value="view">View</Radio>
            <Radio value="edit">Edit</Radio>
          </Radio.Group>
        </ModeContainer>
        <Row align="middle" style={{ height: '100%' }}>
          <Col lg={{ span: 12 }} span={24}>
            <LeftProfileSection imageUrl={profileImage} mode={mode} />
          </Col>
          <Col lg={{ span: 12 }} span={24}>
            <RightProfileSection
              name={name}
              description={description}
              email={email}
              address={address}
              cardNumber={cardNumber}
              phoneNumber={phoneNumber}
              editedName={editedName}
              editedDescription={editedDescription}
              editedEmail={editedEmail}
              editedAddress={editedAddress}
              editedCardNumber={editedCardNumber}
              editedPhoneNumber={editedPhoneNumber}
              onChangeName={(e) => this.setState({ editedName: e.target.value })}
              onChangeEmail={(e) => this.setState({ editedEmail: e.target.value })}
              onChangeAddress={(e) => this.setState({ editedAddress: e.target.value })}
              onChangeDescription={(e) => this.setState({ editedDescription: e.target.value })}
              onChangeCardNumber={(e) => this.setState({ editedCardNumber: e.target.value })}
              onChangePhoneNumber={(e) => this.setState({ editedPhoneNumber: e.target.value })}
              mode={mode}
            />
          </Col>
        </Row>
        {mode === 'edit' && (
          <ButtonContainer>
            <Button type="primary" onClick={this.handleUpdateProfile}>
              Update
            </Button>
          </ButtonContainer>
        )}
      </Content>
    );
  }
}
