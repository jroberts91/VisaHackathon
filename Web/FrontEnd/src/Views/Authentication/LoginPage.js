import React from 'react';
import styled from 'styled-components';
import LogoTagLine from '../../images/LogoTagLine.png';
import { Button, Typography, Alert } from 'antd';
import { TextField, Button as MaterialButton } from '@material-ui/core';
import Recaptcha from 'react-recaptcha';
import 'antd/dist/antd.css';
import API from '../../utils/baseUrl';

const { Title } = Typography;

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
  top: 30%;
  position: relative;
`;

const Logo = styled.img`
  top: 43%;
  position: relative;
`;

const StyledButton = styled(MaterialButton)`
  && {
    width: 60%;
    height: 35px;
    background-color: #00276a;
    color: white;
    border: none;
    margin-top: 110px;
  }
`;

const StyledLinkButton = styled(Button)`
  margin-left: -10px;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 60%;
    margin-top: 10px;
  }
`;

const StyledCaptcha = styled.div`
  margin-top: 10px;
  left: 20%;
  position: absolute;
`;

const StyledSignUpFields = styled.div`
  margin-top: 40px;
  top: 70%;
  position: absolute;
  right: 18%;
  color: #75787b;
`;

const StyledAlerts = styled(Alert)`
  width: 60%;
  right: -20%;
`;

/**
 * Handles the logic and design of the Login Page.
 * It redirects user to their accessible pages after logging in.
 */
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      email: '',
      password: '',
      invalidLogin: false,
      isVerified: false,
    };
  }

  recaptchaLoaded() {
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }

  componentDidMount = () => {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const sendObject = { email, password };
    API.post('api/merchant/login', sendObject).then((res) => {
      const success = res.data.success;
      if (success) {
        history.push('/');
      } else {
        this.setState({
          invalidLogin: true,
        });
      }
    });
  };

  handleSignUp = () => {
    this.props.history.push({
      pathname: '/signup',
    });
  };
  handleEmail = (event) => {
    const { value } = event.target;
    this.setState({
      email: value,
    });
  };

  handlePassword = (event) => {
    const { value } = event.target;
    this.setState({
      password: value,
    });
  };

  handleCaptchaChange = (value) => {
  };

  render() {
    const { email, password, invalidLogin, isVerified } = this.state;
    const LoginPageFields = (
      <StyledRightContainer>
        <FieldsContainer>
          <Title level={2}>Login</Title>
          <StyledTextField
            onChange={this.handleEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            size="small"
          />
          <StyledTextField
            type="password"
            onChange={this.handlePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            size="small"
          />
          <StyledCaptcha>
            <Recaptcha
              sitekey="6LdlpakZAAAAABm6Nn57lV20__54dilJyAJWbBKD"
              render="explicit"
              onloadCallback={this.recaptchaLoaded}
              verifyCallback={this.verifyCallback}
            />
          </StyledCaptcha>
          {invalidLogin && <StyledAlerts message="Invalid Email or Password" type="error" showIcon />}
          <StyledButton
            color="primary"
            variant="contained"
            disabled={!(email.length && password.length && isVerified)}
            onClick={this.handleSubmit}
          >
            Login
          </StyledButton>
        </FieldsContainer>
        <StyledSignUpFields>
          New to Visell?
          <StyledLinkButton type="link" onClick={this.handleSignUp}>
            Sign Up
          </StyledLinkButton>
        </StyledSignUpFields>
      </StyledRightContainer>
    );

    return (
      <div>
        <StyledLeftContainer>
          <Logo src={LogoTagLine} alt="Visell Logo" onClick={() => this.props.history.push('/')} />
        </StyledLeftContainer>
        {LoginPageFields}
      </div>
    );
  }
}
