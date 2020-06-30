import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import LogoNoTagLine from '../../images/LogoNoTagLine.png';
import Logo from '../../images/Logo.png';
import {
  HomeOutlined,
  HistoryOutlined,
  TagOutlined,
  ShopOutlined,
  PieChartOutlined,
  SearchOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

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

  componentDidMount = () => {};

  render() {
    const { collapsed, isLoggedIn } = this.props;
    let buttons;
    const salesHistoryLink = `/history`;
    const myShopLink = `/${this.props.merchantId}`;
    const offersLink = `/offers`;
    const myOffersLink = `/myoffers`;
    const merchantLocator = '/merchantLocator';
    const contactLink = '/contactUs';
    const FAQLink = '/FAQ';

    const getSelectedMerchantMenuItem = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        return '1';
      }
      if (currentPath === myShopLink) {
        return '2';
      }
      if (currentPath === myShopLink) {
        return '3';
      }
      if (currentPath === salesHistoryLink) {
        return '4';
      }
      if (currentPath === contactLink) {
        return '5';
      }
      if (currentPath === FAQLink) {
        return '6';
      }
    };

    const getSelectedBuyerMenuItem = () => {
      const currentPath = window.location.pathname;
      console.log(currentPath);
      if (currentPath === '/') {
        return '1';
      }
      if (currentPath === offersLink) {
        return '2';
      }
      if (currentPath === merchantLocator) {
        return '3';
      }
      if (currentPath === contactLink) {
        return '4';
      }
      if (currentPath === FAQLink) {
        return '5';
      }
    };

    if (isLoggedIn) {
      buttons = (
        <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={[getSelectedMerchantMenuItem()]}>
          <StyledMenuItem key="1" icon={<PieChartOutlined />}>
            Dashboard
            <Link to="/" />
          </StyledMenuItem>

          <StyledMenuItem key="2" icon={<ShopOutlined />} selected={true}>
            My Shop
            <Link to={myShopLink} />
          </StyledMenuItem>

          <StyledMenuItem key="3" icon={<TagOutlined />}>
            Offers
            <Link to={myOffersLink} />
          </StyledMenuItem>

          <StyledMenuItem key="4" icon={<HistoryOutlined />}>
            Sales History
            <Link to={salesHistoryLink} />
          </StyledMenuItem>

          <StyledMenuItem key="5" icon={<MessageOutlined />}>
            Contact Us
            <Link to={contactLink} />
          </StyledMenuItem>

          <StyledMenuItem key="6" icon={<QuestionCircleOutlined />}>
            FAQ
            <Link to={FAQLink} />
          </StyledMenuItem>
        </StyledMenu>
      );
    } else {
      buttons = (
        <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={[getSelectedBuyerMenuItem()]}>
          <StyledMenuItem key="1" icon={<HomeOutlined />}>
            Home
            <Link to="/" />
          </StyledMenuItem>

          <StyledMenuItem key="2" icon={<TagOutlined />}>
            Offers
            <Link to={offersLink} />
          </StyledMenuItem>

          <StyledMenuItem key="3" icon={<SearchOutlined />}>
            Maps
            <Link to={merchantLocator} />
          </StyledMenuItem>

          <StyledMenuItem key="4" icon={<MessageOutlined />}>
            Contact Us
            <Link to={contactLink} />
          </StyledMenuItem>

          <StyledMenuItem key="5" icon={<QuestionCircleOutlined />}>
            FAQ
            <Link to={FAQLink} />
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
