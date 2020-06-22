import React from 'react';
import styled from 'styled-components';
import LogoTagLine from '../../images/LogoTagLine.png';
import { Typography, Steps, Upload, message, Alert } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TextField, Button } from '@material-ui/core';
import API from '../../utils/baseUrl';
import 'antd/dist/antd.css';

const { Step } = Steps;

const { Title, Text } = Typography;

const StyledLeftContainer = styled.div`
  background: linear-gradient(#1f417c, 20%, #00276a);
  text-align: center;
  height: 100%;
  width: 50%;
  position: fixed;
`;

const StyledRightContainer = styled.div`
  text-align: center;
  height: 100%;
  width: 50%;
  left: 50%;
  position: absolute;
`;

const FieldsContainer = styled.div`
  top: 10%;
  position: relative;
`;

const StyledTitle = styled(Title)`
  && {
    margin-bottom: 20px;
  }
`;

const Logo = styled.img`
  top: 43%;
  position: relative;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 60%;
    margin-top: 10px;
  }
`;

const StyledTextFieldTop = styled(TextField)`
  && {
    width: 60%;
    margin-top: 80px;
  }
`;

const StyledText = styled(Text)`
  position: absolute;
  left: 20%;
  top: 40px;
`;

const StyledSteps = styled(Steps)`
  width: 75%;
  right: 13%;
  position: absolute;
`;

const StyledUpload = styled(Upload)`
  position: absolute;
  left: calc(20% + 100px);
  width: 0%;
`;

const StyledUploadGroup = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
`;

const StyledAlerts = styled(Alert)`
  width: 60%;
  right: -20%;
`;

const StyledMaterialButtonRight = styled(Button)`
  && {
    position: absolute;
    top: 140%;
    right: 20%;
  }
`;

const StyledMaterialButtonLeft = styled(Button)`
  && {
    position: absolute;
    top: 140%;
    left: 20%;
  }
`;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      differentPasswords: false,
      email: '',
      password: '',
      confirmPassword: '',
      storeName: '',
      storeDescription: '',
      phoneNumber: '',
      address: '',
      cardNumber: '',
      current: 0,
    };
  }

  componentDidMount = () => {};

  /**
   * Runs when component `signup` mounts
   * Checks sessionStorage if user is logged in (response.status == 200)
   * IF response.status !==200, user is routed to './'
   */
  handleSubmit = () => {
    const { storeName, storeDescription, email, password, differentPasswords } = this.state;
    const { history } = this.props;
    const sendObject = { name: storeName, email, password, description: storeDescription };
    API.post('api/merchant/register', sendObject).then((res) => {
      console.log(res);
      const success = res.data.success;
      if (success) {
        history.push('/');
      }
      console.log(res.data.loginSuccess);
    });
  };

  handleChangeStoreName = (event) => {
    this.setState({
      storeName: event.target.value,
    });
  };

  handleChangeStoreDescription = (event) => {
    this.setState({
      storeDescription: event.target.value,
    });
  };

  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleChangeConfirmPassword = (event) => {
    if (event.target.value !== this.state.password) {
      this.setState({
        differentPasswords: true,
        confirmPassword: event.target.value,
      });
    } else {
      this.setState({
        differentPasswords: false,
        confirmPassword: event.target.value,
      });
    }
  };

  handleChangePhoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  handleChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleChangeCardNumber = (event) => {
    this.setState({
      cardNumber: event.target.value,
    });
  };

  handleChangePic = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  onChange = (current) => {
    this.setState({ current });
  };

  nextSection = () => {
    this.setState({ current: this.state.current + 1 });
  };

  prevSection = () => {
    this.setState({ current: this.state.current - 1 });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      storeName,
      storeDescription,
      phoneNumber,
      address,
      cardNumber,
      current,
      imageUrl,
      differentPasswords,
    } = this.state;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const SignUpPageFields = (
      <StyledRightContainer>
        <FieldsContainer>
          <StyledTitle level={2}>Sign Up</StyledTitle>
          <StyledSteps current={current} onChange={this.onChange}>
            <Step title="Personal" />
            <Step title="Store" disabled={!(email.length && password.length && confirmPassword.length)} />
            <Step
              title="Payment"
              disabled={
                !(
                  email.length &&
                  password.length &&
                  confirmPassword.length &&
                  storeName.length &&
                  storeDescription.length &&
                  phoneNumber.length &&
                  address.length
                )
              }
            />
          </StyledSteps>
          {this.state.current === 0 && (
            <div>
              <StyledTextFieldTop
                onChange={this.handleChangeEmail}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                size="small"
                value={email}
              />
              <StyledTextField
                type="password"
                onChange={this.handleChangePassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                size="small"
                value={password}
              />
              <StyledTextField
                type="password"
                onChange={this.handleChangeConfirmPassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                size="small"
                value={confirmPassword}
              />
              {differentPasswords && <StyledAlerts message="Passwords do not match" type="warning" showIcon />}
              <StyledMaterialButtonRight
                variant="contained"
                color="primary"
                onClick={this.nextSection}
                disabled={!(email.length && password.length && confirmPassword.length)}
              >
                Next
              </StyledMaterialButtonRight>
            </div>
          )}
          {this.state.current === 1 && (
            <div>
              <StyledTextFieldTop
                onChange={this.handleChangeStoreName}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Name"
                size="small"
                value={storeName}
              />
              <StyledTextField
                onChange={this.handleChangePhoneNumber}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Telephone No."
                size="small"
                value={phoneNumber}
              />
              <StyledTextField
                onChange={this.handleChangeAddress}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address"
                size="small"
                value={address}
              />
              <StyledTextField
                onChange={this.handleChangeStoreDescription}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                multiline
                rows={4}
                size="small"
                value={storeDescription}
              />
              <StyledUploadGroup>
                <StyledText> Picture </StyledText>
                <StyledUpload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChangePic}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </StyledUpload>
              </StyledUploadGroup>
              <StyledMaterialButtonLeft variant="contained" color="primary" onClick={this.prevSection}>
                Back
              </StyledMaterialButtonLeft>
              <StyledMaterialButtonRight
                variant="contained"
                color="primary"
                onClick={this.nextSection}
                disabled={
                  !(
                    email.length &&
                    password.length &&
                    confirmPassword.length &&
                    storeName.length &&
                    storeDescription.length &&
                    phoneNumber.length &&
                    address.length
                  )
                }
              >
                Next
              </StyledMaterialButtonRight>
            </div>
          )}
          {this.state.current === 2 && (
            <div>
              <StyledTextFieldTop
                onChange={this.handleChangeCardNumber}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Card Number"
                size="small"
              />
              <StyledMaterialButtonLeft variant="contained" color="primary" onClick={this.prevSection}>
                Back
              </StyledMaterialButtonLeft>
              <StyledMaterialButtonRight
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                disabled={
                  !(
                    email.length &&
                    password.length &&
                    confirmPassword.length &&
                    storeName.length &&
                    storeDescription.length &&
                    phoneNumber.length &&
                    address.length &&
                    cardNumber.length
                  )
                }
              >
                Submit
              </StyledMaterialButtonRight>
            </div>
          )}
        </FieldsContainer>
      </StyledRightContainer>
    );

    return (
      <div>
        <StyledLeftContainer>
          <Logo src={LogoTagLine} alt="Visell Logo" onClick={() => this.props.history.push('/')} />
        </StyledLeftContainer>
        {SignUpPageFields}
      </div>
    );
  }
}
