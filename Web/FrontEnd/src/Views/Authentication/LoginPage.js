import React from 'react';
import styled from 'styled-components';
import LogoTagLine from '../../images/LogoTagLine.png';
import { Button, Typography } from 'antd';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import 'antd/dist/antd.css';

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

const StyledButton = styled(Button)`
  width: 60%;
  height: 35px;
  background-color: #00276a;
  color: white;
  border: none;
  margin-top: 40px;
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

const StyledSignUpFields = styled.div`
  margin-top: 40px;
  top: 60%;
  position: absolute;
  right: 18%;
  color: #75787b;
`;

/**
 * Handles the logic and design of the Login Page.
 * It redirects user to their accessible pages after logging in.
 */
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount = () => {};

  handleSubmit = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const sendObject = { email, password };
    axios.post('api/merchant/login', sendObject).then((res) => {
      console.log(res);
      const success = res.data.success;
      if (success) {
        history.push('/');
      }
    });
  };

  handleSuccessfulLogin = (decoded) => {
    const { history } = this.props;
    const { email } = this.state;
    const { username, companyName, first_login } = decoded;
    this.setState({
      isFirstChangePassword: !!first_login,
      isLogin: !!!first_login,
      email: email || username,
    });

    !!!first_login &&
      history.push({
        pathname: '/',
        state: { email: email || username, companyName },
      });
  };

  handleSignUp = () => {
    console.log(this.state.email);
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

  render() {
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
          <StyledButton type="primary" onClick={this.handleSubmit}>
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
          <Logo src={LogoTagLine} alt="Visell Logo" />
        </StyledLeftContainer>
        {LoginPageFields}
      </div>
    );
  }
}
