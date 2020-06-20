import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Layout, Button, Avatar, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  height: 60px;
  padding-left: 10px;
  background-color: white;
`;
const StyledButton = styled(Button)`
  color: black;
`;

const StyledLoginButton = styled(Button)`
  right: 130px;
  top: 15px;
  position: absolute;
  width: 90px;
`;

const StyledRegisterButton = styled(Button)`
  right: 25px;
  top: 15px;
  position: absolute;
  width: 90px;
`;

const StyledAvatar = styled(Avatar)`
  right: 135px;
  top: 11px;
  position: absolute;
`;

const StyledsUserName = styled(Text)`
  right: 185px;
  top: 0;
  position: absolute;
`;

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  componentDidMount = () => {};

  handleLoginClick = () => {
    this.props.history.push({
      pathname: '/login',
    });
  };

  handleRegisterClick = () => {
    this.props.history.push({
      pathname: '/signup',
    });
  };

  handleUserMenuClick = () => {};

  render() {
    const { toggleSideDrawer, collapsed, isLoggedIn, handleLogoutClick, username } = this.props;

    let buttons;

    if (isLoggedIn) {
      buttons = (
        <div>
          <StyledsUserName>{username}</StyledsUserName>
          <StyledAvatar size="large" icon={<UserOutlined />} onClick={this.handleUserMenuClick} />
          <StyledRegisterButton onClick={handleLogoutClick}> Logout </StyledRegisterButton>
        </div>
      );
    } else {
      buttons = (
        <div>
          <StyledRegisterButton onClick={this.handleRegisterClick}> Register </StyledRegisterButton>
          <StyledLoginButton onClick={this.handleLoginClick}> Login </StyledLoginButton>
        </div>
      );
    }

    return (
      <StyledHeader>
        {collapsed && <StyledButton ghost icon={<MenuUnfoldOutlined />} onClick={toggleSideDrawer} />}
        {!collapsed && <StyledButton ghost icon={<MenuFoldOutlined />} onClick={toggleSideDrawer} />}
        {buttons}
      </StyledHeader>
    );
  }
}
