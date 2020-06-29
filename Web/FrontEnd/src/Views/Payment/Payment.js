import React from 'react';
import { Link } from 'react-router-dom';
import PaymentProductCard from '../../Components/Cards/PaymentProductCard';
import PaymentForm from './PaymentForm';
import { Row, Col, Layout, message, Typography, Popover, Table, Button } from 'antd';
import queryString from 'query-string';
import { defaultTheme } from '../../utils/theme';
import API, { baseUrl } from '../../utils/baseUrl';
import { ShopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const { Content } = Layout;
const { Title } = Typography;
const columns = [
  {
    title: 'Offer',
    dataIndex: 'offerName',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
];

const AddButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
  border-color: ${defaultTheme.colors.primary};
  margin-bottom: 0;
`;

const ErrorMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 16px;
`;

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    const queries = queryString.parse(this.props.location.search);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      productId: this.props.match.params.productId,
      isOwnerShop: this.props.match.params.merchantId === this.props.loggedInUserId,
      product: null,
      merchant: null,
      qty: queries.qty,
      offers: [],
    };
  }

  getMerchantOffersFromApi = (merchantId) => {};

  componentDidMount = () => {
    API.get(`api/product/get?id=${this.state.productId}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ product: res.data.product });
        } else {
          message.error({
            content: `Invalid product id of '${this.state.productId}'`,
            duration: 5,
          });
        }
      })
      .catch((err) => console.error(err));

    API.get(`api/merchant/get?id=${this.state.merchantId}`)
      .then((res) => {
        this.setState({ merchant: res.data.merchant });
      })
      .catch((err) => console.error(err));

    API.get(`api/offers/visell/getByMerchant?merchantId=${this.state.merchantId}`)
      .then((res) => {
        this.setState({ offers: res.data.offers });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { product, qty, merchantId, productId, merchant, isOwnerShop, offers } = this.state;
    const { isLoggedIn } = this.props;
    const content = <Table columns={columns} dataSource={offers} />;

    if (product == null || merchant == null) {
      // when product or merchant isn't populated yet
      return null;
    }

    if (isLoggedIn) {
      return (
        <ErrorMessageContainer>
          To make payments, you must be logged out as a normal user instead of a merchant.
        </ErrorMessageContainer>
      );
    }

    let headerName;

    if (isOwnerShop) {
      headerName = 'My Shop';
    } else {
      headerName = merchant.name;
    }

    const totalPrice = (product.price * qty).toFixed(2);
    return (
      <Content style={{ maxWidth: '1280px', minWidth: '1280px', margin: '0 auto', marginTop: '5vh' }}>
        <Row align="top" justify="space-between" style={{ margin: '0 0 50px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <Link to={'/'} style={{ color: '#828282' }}>
              <ShopOutlined /> {headerName}
            </Link>{' '}
            /
            <Link to={`/${merchantId}/product/${productId}`} style={{ color: '#828282' }}>
              {product.name}
            </Link>{' '}
            / Payment
          </Title>

          <Popover content={content}>
            <AddButton type="primary" style={{ float: 'right' }}>
              Offers
            </AddButton>
          </Popover>
        </Row>
        <Row align="middle">
          <Col lg={{ span: 10 }} span={24}>
            <PaymentProductCard
              imageUrl={`${baseUrl}${product.images[0]}`}
              qty={qty}
              price={product.price.toFixed(2)}
              title={product.name}
            />
          </Col>
          <Col lg={{ span: 14 }} span={24}>
            {/* TBC: shipping fee is not yet available in the backend, will set default as $2 */}
            <PaymentForm
              merchantId={merchantId}
              productId={productId}
              qty={qty}
              totalPrice={totalPrice}
              shippingFee={product.shippingFee || 2}
              history={this.props.history}
            />
          </Col>
        </Row>
      </Content>
    );
  }
}
