import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Layout, Button, Avatar, Typography, Menu, Dropdown } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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

const StyledDropDownIcon = styled(DownOutlined)`
  right: 110px;
  top: 25px;
  position: absolute;
`;

const StyledMenu = styled(Menu)`
  width: 150px;
  right: 50px;
  position: absolute;
`;

const StyledMenuItem = styled(Menu.Item)`
  margin: 0 auto;
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

  render() {
    const { toggleSideDrawer, collapsed, isLoggedIn, username, merchantId, handleLogoutClick } = this.props;

    let buttons;
    const menu = (
      <StyledMenu>
        <StyledMenuItem>
          <Link to={`/profile/${merchantId}`}>Profile</Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogoutClick}>Logout</StyledMenuItem>
      </StyledMenu>
    );

    if (isLoggedIn) {
      buttons = (
        <Dropdown overlay={menu} trigger={['click']}>
          <div onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
            <StyledsUserName>{username}</StyledsUserName>
            <StyledAvatar size="large" icon={<UserOutlined />} />
            <StyledDropDownIcon />
          </div>
        </Dropdown>
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
