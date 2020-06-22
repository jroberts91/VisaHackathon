import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import LogoNoTagLine from '../../images/LogoNoTagLine.png';
import Logo from '../../images/Logo.png';
import { HomeOutlined, HistoryOutlined, TagOutlined, ShopOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background-color: #1a1f71;
  min-height: 100vh;
`;

const StyledLogo = styled.img`
  position: relative;
  height: 45px;
  top: 11%;
`;

const StyledImageContainer = styled.div`
  height: 56px;
`;

const StyledMenu = styled(Menu)`
  && {
    background-color: #1a1f71;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  color: white;
`;

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  componentDidMount = () => { };

  render() {
    const { collapsed, isLoggedIn } = this.props;
    let buttons;
    const salesHistoryLink = `/${this.props.merchantId}/history`;
    const myShopLink = `/${this.props.merchantId}`;
    const offersLink = `/offers`;
    if (isLoggedIn) {
      buttons = (
        <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <StyledMenuItem key="1" icon={<HomeOutlined />}>
            Home
            <Link to="/" />
          </StyledMenuItem>
          <StyledMenuItem key="2" icon={<HistoryOutlined />}>
            Sales History
            <Link to={salesHistoryLink} />
          </StyledMenuItem>
          <StyledMenuItem key="3" icon={<TagOutlined />}>
            Offers
            <Link to={offersLink} />
          </StyledMenuItem>
          <StyledMenuItem key="4" icon={<ShopOutlined />}>
            My Shop
            <Link to={myShopLink} />
          </StyledMenuItem>
        </StyledMenu>
      );
    } else {
      buttons = (
        <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <StyledMenuItem key="1" icon={<HomeOutlined />}>
            Home
            <Link to="/" />
          </StyledMenuItem>
          <StyledMenuItem key="3" icon={<TagOutlined />}>
            Offers
            <Link to={offersLink} />
          </StyledMenuItem>
        </StyledMenu>
      );
    }

    return (
      <StyledSider trigger={null} collapsible collapsed={this.props.collapsed}>
        <StyledImageContainer>
          {!collapsed && <StyledLogo src={LogoNoTagLine} alt="Visell Logo" />}
          {collapsed && <StyledLogo src={Logo} alt="Visell Logo" />}
        </StyledImageContainer>
        {buttons}
      </StyledSider>
    );
  }
}
