import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import TopBar from '../Components/Layout/TopBar';
import SideBar from '../Components/Layout/SideBar';
import HomeBody from './Body/HomeBody';
import SalesHistory from './SalesHistory/SalesHistory';
import Payment from './Payment/Payment';
import OrderSummary from './OrderSummary/OrderSummary';
import AddProduct from './AddProduct/AddProduct';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      isLoggedIn: false,
      merchantId: null,
    };
  }

  componentDidMount = () => {
    this.handleCheckAuth();
  };

  handleCheckAuth = () => {
    axios.get('api/merchant/auth').then((res) => {
      const { success, name, _id } = res.data;
      if (success) {
        this.setState({
          isLoggedIn: true,
          username: name,
          merchantId: _id,
        });
      }
      console.log(res);
    });
  };

  handleLogoutClick = () => {
    axios.get('api/merchant/logout').then((res) => {
      console.log(res);
    });
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    const { collapsed, isLoggedIn, username, merchantId } = this.state;
    const toggleSideDrawer = () => this.setState({ collapsed: !collapsed });
    return (
      <Layout>
        <SideBar collapsed={collapsed} isLoggedIn={isLoggedIn} merchantId={merchantId} />
        <Layout className="site-layout">
          <TopBar
            toggleSideDrawer={toggleSideDrawer}
            collapsed={collapsed}
            history={this.props.history}
            isLoggedIn={isLoggedIn}
            handleLogoutClick={this.handleLogoutClick}
            username={username}
          />
          <Switch>
            <Route path="/" exact component={HomeBody} />
            <Route path="/:merchantId" exact component={MerchantShop} />
            <Route path="/:merchantId/history" component={SalesHistory} />
            <Route path="/:merchantId/product/:productId/payment" component={Payment} />
            <Route path="/order/:orderId" component={OrderSummary} />
            <Route path="/:merchantId/addproduct" component={AddProduct} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
