import React from 'react';
import styled from 'styled-components';
import LogoTagLine from '../../images/LogoTagLine.png';
import { Button, Typography } from 'antd';
import { TextField } from '@material-ui/core';
import API from '../../utils/baseUrl';
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
  top: 15%;
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

const StyledTextField = styled(TextField)`
  && {
    width: 60%;
    margin-top: 10px;
  }
`;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
      storeDescription: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentDidMount = () => {};

  /**
   * Runs when component `signup` mounts
   * Checks sessionStorage if user is logged in (response.status == 200)
   * IF response.status !==200, user is routed to './'
   */
  handleSubmit = () => {
    const { storeName, storeDescription, email, password } = this.state;
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
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  render() {
    const SignUpPageFields = (
      <StyledRightContainer>
        <FieldsContainer>
          <Title level={2}>Sign Up</Title>
          <StyledTextField
            onChange={this.handleChangeStoreName}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Store Name"
            size="small"
          />
          <StyledTextField
            onChange={this.handleChangeStoreDescription}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Store Description"
            multiline
            rows={4}
            size="small"
          />
          <StyledTextField
            onChange={this.handleChangeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            size="small"
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
          />
          <StyledButton type="primary" onClick={this.handleSubmit}>
            Register
          </StyledButton>
        </FieldsContainer>
      </StyledRightContainer>
    );

    return (
      <div>
        <StyledLeftContainer>
          <Logo src={LogoTagLine} alt="Visell Logo" />
        </StyledLeftContainer>
        {SignUpPageFields}
      </div>
    );
  }
}
