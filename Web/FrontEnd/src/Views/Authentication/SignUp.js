import React from 'react';
import styled from 'styled-components';
import LogoTagLine from '../../images/LogoTagLine.png';
import { Typography, Steps, Upload, Alert, Button as AntButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TextField, Button } from '@material-ui/core';
import API from '../../utils/baseUrl';
import { isStrongPassword as isWeakPasswordPredicate } from '../../utils/passwordValidation';
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
  top: 37px;
`;

const StyledUploadGroup = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
`;

const StyledAlerts = styled(Alert)`
  margin-bottom: 10px;
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

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      differentPasswords: false,
      uploaded: false,
      email: '',
      password: '',
      confirmPassword: '',
      storeName: '',
      storeDescription: '',
      phoneNumber: '',
      address: '',
      cardNumber: '',
      files: '',
      binNo: '',
      current: 0,
    };
  }

  componentDidMount = () => {};

  handleSubmit = () => {
    const { storeName, storeDescription, email, password, files, phoneNumber, address, binNo } = this.state;
    const { history } = this.props;
    const body = {
      name: storeName,
      email: email,
      password: password,
      description: storeDescription,
      phone: phoneNumber,
      address: address,
      binNo: binNo,
    };

    let formData = new FormData();
    formData.append('files', files);

    for (var key in body) {
      formData.append(key, body[key]);
    }

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    API.post('api/merchant/register', formData, config).then((res) => {
      const success = res.data.success;
      if (success) {
        const { email, password } = this.state;
        const sendObject = { email, password };
        API.post('api/merchant/login', sendObject).then((res) => {
          const success = res.data.success;
          if (success) {
            history.push('/');
          }
        });
      }
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
    if (event.target.value !== this.state.confirmPassword) {
      this.setState({
        differentPasswords: true,
        password: event.target.value,
      });
    } else {
      this.setState({
        differentPasswords: false,
        password: event.target.value,
      });
    }
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

  handleChangeBinNo = (event) => {
    this.setState({
      binNo: event.target.value,
    });
  };

  handleChangePic = (info) => {
    this.setState({
      uploaded: true,
      files: info.file,
      imageUrl: info.file.name,
    });
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
      uploaded,
    } = this.state;

    const isWeakPassword = isWeakPasswordPredicate(password);

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
              {!isWeakPassword && (
                <StyledAlerts
                  message="Password must be: 8 to 20 characters long, include at least one digit, uppercase and lowercase letter"
                  type="error"
                  showIcon
                />
              )}
              {differentPasswords && <StyledAlerts message="Passwords do not match" type="error" showIcon />}
              <StyledMaterialButtonRight
                variant="contained"
                color="primary"
                onClick={this.nextSection}
                disabled={!(email.length && password.length && confirmPassword.length && !differentPasswords)}
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
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={() => false}
                  onChange={this.handleChangePic}
                >
                  <AntButton>
                    <UploadOutlined /> Click to Upload
                  </AntButton>
                  <StyledText> {imageUrl} </StyledText>
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
                    address.length &&
                    uploaded
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
              <StyledTextField
                onChange={this.handleChangeBinNo}
                variant="outlined"
                margin="normal"
                fullWidth
                helperText="Acquiring bin number provided by Visa licensed acquirer or representative"
                label="Bin Number (Optional)"
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
                    uploaded &&
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
