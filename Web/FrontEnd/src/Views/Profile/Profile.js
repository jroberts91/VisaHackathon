import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Typography, message, Empty, Radio, Input, Button, Upload, Tooltip } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { baseUrl } from '../../utils/baseUrl';
import { QuestionCircleOutlined } from '@ant-design/icons';
import API from '../../utils/baseUrl';

const { Content } = Layout;
const { Text, Title } = Typography;
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

const StyledImage = styled.img`
  max-width: 60%;
`;

class LeftProfileSection extends React.Component {
  render() {
    const { profileImage, mode, editedProfileImage, setUploadedFile } = this.props;
    const handleChangePic = (info) => {
      setUploadedFile(info.file);
      message.info({
        content: `Uploaded ${info.file.name}, click on the update button to change your profile picture.`,
        duration: 5,
      });
    };

    return (
      <Col>
        <Row span={24} justify="center" style={{ marginBottom: '50px' }}>
          {mode === 'view' ? (
            profileImage ? (
              <StyledImage src={`${baseUrl}${profileImage}`} />
            ) : (
              <Empty description="no profile image" />
            )
          ) : editedProfileImage ? (
            <StyledImage src={`${baseUrl}${editedProfileImage}`} />
          ) : (
            <Empty description="no profile image" />
          )}
        </Row>
        <Row span={12} justify="center" align="middle">
          {mode === 'edit' && (
            <>
              <Upload
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={() => false}
                onChange={handleChangePic}
              >
                <Button>
                  <UploadOutlined /> Click to Upload
                </Button>
              </Upload>
              <Tooltip
                placement="top"
                title="Image will be reflected clicking on update button."
                style={{ marginLeft: '10px' }}
              >
                <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
              </Tooltip>
            </>
          )}
        </Row>
      </Col>
    );
  }
}

class RightProfileSection extends React.Component {
  render() {
    const { name, description, email, address, phone, cardNumber, mode, binNo } = this.props;
    const {
      editedName,
      editedDescription,
      editedEmail,
      editedAddress,
      editedPhone,
      editedCardNumber,
      editedBinNo,
      onChangeName,
      onChangeEmail,
      onChangeDescription,
      onChangeAddress,
      onChangeCardNumber,
      onChangeBinNo,
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
          <Col span={16}>{mode === 'view' ? phone : <Input value={editedPhone} onChange={onChangePhoneNumber} />}</Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Card Number:</Col>
          <Col span={16}>
            {mode === 'view' ? cardNumber : <Input value={editedCardNumber} onChange={onChangeCardNumber} />}
          </Col>
        </Row>
        <Row span={24} style={{ minHeight: '50px' }}>
          <Col span={8}>Bin Number:</Col>
          <Col span={16}>{mode === 'view' ? binNo : <Input value={editedBinNo} onChange={onChangeBinNo} />}</Col>
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
      phone: '',
      address: '',
      cardNumber: '',
      binNo: '',
      isMounted: false,
      mode: 'view',
      editedName: '',
      editedEmail: '',
      editedDescription: '',
      editedPhone: '',
      editedCardNumber: '',
      editedBinNo: '',
      editedAddress: '',
      editedProfileImage: '',
      files: null,
    };
  }

  componentDidMount = () => {
    API.get(`api/merchant/get?id=${this.state.merchantId}`)
      .then((res) => {
        if (res.data.success) {
          const { name, email, description, profileImage, address, phone, cardNumber, binNo } = res.data.merchant;
          this.setState({
            name: name,
            email: email,
            description: description,
            profileImage: profileImage,
            address: address,
            phone: phone,
            cardNumber: cardNumber,
            binNo: binNo,
          });

          // initialize edited fields as the same value
          this.setState({
            editedName: name,
            editedEmail: email,
            editedDescription: description,
            editedAddress: address,
            editedPhone: phone,
            editedCardNumber: cardNumber,
            editedProfileImage: profileImage,
            editedBinNo: binNo,
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
    const {
      editedName,
      editedDescription,
      editedEmail,
      editedAddress,
      editedPhone,
      editedCardNumber,
      editedProfileImage,
      editedBinNo,
      files,
    } = this.state;

    const body = {
      name: editedName,
      email: editedEmail,
      description: editedDescription,
      address: editedAddress,
      phone: editedPhone,
      cardNumber: editedCardNumber,
      binNo: editedBinNo,
    };

    // submission of text fields
    API.post('/api/merchant/editProfile', body)
      .then((res) => {
        if (res.data.success) {
          message.success({ content: 'Profile details updated successful.', duration: 5 });

          // update current display values
          this.setState({
            name: editedName,
            email: editedEmail,
            description: editedDescription,
            address: editedAddress,
            phone: editedPhone,
            cardNumber: editedCardNumber,
            profileImage: editedProfileImage,
            binNo: editedBinNo,
          });
        } else {
          message.error({ content: 'Error while trying to update profile', duration: 5 });
        }
      })
      .catch((err) => console.error(err));

    // submission of profile image
    if (files != null) {
      const formData = new FormData();
      formData.append('files', files);
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      };

      API.post('/api/merchant/uploadProfileImage', formData, config)
        .then((res) => {
          if (res.data.success) {
            message.success({ content: `Profile image updated successfully`, duration: 5 });
            this.setState({ editedProfileImage: res.data.profileImage });
            this.setState({ profileImage: res.data.profileImage });
          }
        })
        .catch((err) => console.error(err));
    }
  };

  render() {
    const {
      name,
      email,
      description,
      profileImage,
      phone,
      cardNumber,
      binNo,
      address,
      isMounted,
      mode,
      merchantId,
    } = this.state;
    const {
      editedName,
      editedDescription,
      editedEmail,
      editedAddress,
      editedPhone,
      editedCardNumber,
      editedBinNo,
      editedProfileImage,
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
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <Link style={{ color: '#828282' }} to={`/profile/${merchantId}`}>
              <UserOutlined /> My Profile
            </Link>{' '}
          </Title>
        </Row>
        <ModeContainer>
          <Text strong style={{ marginRight: '10px' }}>
            Mode:
          </Text>
          <Radio.Group onChange={(e) => this.setState({ mode: e.target.value })} value={this.state.mode}>
            <Radio value="view">View</Radio>
            <Radio value="edit">Edit</Radio>
          </Radio.Group>
        </ModeContainer>
        <Row align="middle" style={{ marginTop: '1%' }}>
          <Col lg={{ span: 12 }} span={24}>
            <LeftProfileSection
              mode={mode}
              profileImage={profileImage}
              editedProfileImage={editedProfileImage}
              setProfileImage={(url) => this.setState({ profileImage: url })}
              setEditedProfileImage={(url) => this.setState({ editedProfileImage: url })}
              setUploadedFile={(file) => this.setState({ files: file })}
            />
          </Col>
          <Col lg={{ span: 12 }} span={24}>
            <RightProfileSection
              name={name}
              description={description}
              email={email}
              address={address}
              cardNumber={cardNumber}
              phone={phone}
              binNo={binNo}
              editedName={editedName}
              editedDescription={editedDescription}
              editedEmail={editedEmail}
              editedAddress={editedAddress}
              editedCardNumber={editedCardNumber}
              editedPhone={editedPhone}
              editedBinNo={editedBinNo}
              onChangeName={(e) => this.setState({ editedName: e.target.value })}
              onChangeEmail={(e) => this.setState({ editedEmail: e.target.value })}
              onChangeAddress={(e) => this.setState({ editedAddress: e.target.value })}
              onChangeDescription={(e) => this.setState({ editedDescription: e.target.value })}
              onChangeCardNumber={(e) => this.setState({ editedCardNumber: e.target.value })}
              onChangeBinNo={(e) => this.setState({ editedBinNo: e.target.value })}
              onChangePhoneNumber={(e) => this.setState({ editedPhone: e.target.value })}
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
