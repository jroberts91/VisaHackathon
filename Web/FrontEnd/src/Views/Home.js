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
import Dashboard from './Dashboard/Dashboard';
import OrderSummary from './OrderSummary/OrderSummary';
import AddProduct from './AddProduct/AddProduct';
import Profile from './Profile/Profile';
import OfferPage from './Offers/OfferPage';
import MerchantLocator from './MerchantLocator/MerchantLocator';
import API from '../utils/baseUrl';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      isLoggedIn: false,
      merchantId: null,
      isMounted: false,
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
      this.setState({ isMounted: true });
    });
  };

  handleLogoutClick = () => {
    API.get('api/merchant/logout').then((res) => {
      if (res.status === 200) {
        this.setState({
          isLoggedIn: false,
        });
        this.props.history.push({
          pathname: '/',
        });
      }
    });
  };

  render() {
    const { collapsed, isLoggedIn, username, merchantId, isMounted } = this.state;
    const toggleSideDrawer = () => this.setState({ collapsed: !collapsed });
    if (!isMounted) {
      return null; // only return the content when user is finished authenticating
    }
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
            <Route path="/dashboard" exact render={(props) => <Dashboard loggedInUserId={merchantId} {...props} />} />
            <Route path="/merchantLocator" component={MerchantLocator} />
            <Route path="/offers" component={OfferPage} />
            <Route path="/:merchantId" exact render={(props) => <MerchantShop loggedInId={merchantId} {...props} />} />
            <Route path="/profile/:merchantId" render={(props) => <Profile loggedInUserId={merchantId} {...props} />} />
            <Route path="/:merchantId/history" exact component={SalesHistory} />
            <Route
              path="/:merchantId/product/:productId"
              exact
              render={(props) => <ProductPage loggedInId={merchantId} {...props} />}
            />
            <Route
              path="/:merchantId/product/:productId/payment"
              render={(props) => <Payment loggedInUserId={merchantId} {...props} />}
            />
            <Route path="/order/:orderId" component={OrderSummary} history={this.props.history} />
            <Route path="/:merchantId/addproduct" component={AddProduct} />
          </Switch>
        </Layout>
      </Layout>
    );
  }
}
