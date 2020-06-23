import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import TopBar from '../Components/Layout/TopBar';
import SideBar from '../Components/Layout/SideBar';
import HomeBody from './Body/HomeBody';
import SalesHistory from './SalesHistory/SalesHistory';
import MerchantShop from './MerchantShop/MerchantShop';
import ProductPage from './ProductPage/ProductPage';
import Payment from './Payment/Payment';
import OrderSummary from './OrderSummary/OrderSummary';
import AddProduct from './AddProduct/AddProduct';
import Profile from './Profile/Profile';
import OfferPage from './Offers/OfferPage';
import API from '../utils/baseUrl';

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
    API.get('api/merchant/auth').then((res) => {
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
    API.get('api/merchant/logout').then((res) => {
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
            merchantId={merchantId}
          />
          <Switch>
            <Route path="/" exact component={HomeBody} />
            <Route path="/offers" render={() => <OfferPage merchantName={username} />} />
            <Route path="/:merchantId" exact component={MerchantShop} />
            <Route path="/profile/:merchantId" render={(props) => <Profile loggedInUserId={merchantId} {...props} />} />
            <Route path="/:merchantId/history" exact component={SalesHistory} />
            <Route path="/:merchantId/product/:productId" exact component={ProductPage} />
            <Route path="/:merchantId/product/:productId/payment" component={Payment} />
            <Route path="/order/:orderId" component={OrderSummary} history={this.props.history} />
            <Route path="/:merchantId/addproduct" component={AddProduct} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
