import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Layout, Typography, Button, Popover, Table } from 'antd';
import { defaultTheme } from '../../utils/theme';
import { ShopOutlined, TagOutlined, PlusOutlined } from '@ant-design/icons';
import ProductCard from '../../Components/Cards/ProductCard';
import API from '../../utils/baseUrl';
import { ProductListContext } from '../../utils/merchantShopContext';

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
];

const AddButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
  border-color: ${defaultTheme.colors.primary};
  margin-bottom: 0;
`;

const StyledButton = styled(Button)`
  background: ${defaultTheme.colors.primary};
`;

class ProductList extends React.Component {
  render() {
    const { merchantId, products, isOwnerShop } = this.props;

    return (
      <Row gutter={[32, 32]}>
        {products.map((product, index) => {
          const { name, images, url, rating, _id, totalQty, soldQty, show } = product;
          if (show !== undefined && !show) {
            return null;
          }
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <ProductCard
                title={name}
                imageUrl={images[0]}
                rating={rating}
                productUrl={url}
                productId={_id}
                merchantId={merchantId}
                isOwnerShop={isOwnerShop}
                isSoldOut={totalQty === soldQty}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default class MerchantShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
      products: [],
      merchantName: '',
      offers: [],
      isOwnerShop: this.props.match.params.merchantId === this.props.loggedInId,
      updateProductList: () => this.getProductFromApi(this.state.merchantId),
    };
  }

  getProductFromApi = (merchantId) => {
    const body = {
      merchantId: merchantId,
    };
    API.post('api/product/getAll', body)
      .then((res) => {
        this.setState({ products: res.data.products });
      })
      .catch((err) => console.error(err));
  };

  getMerchantNameFromApi = (merchantId) => {
    API.get('api/merchant/get?id=' + merchantId)
      .then((res) => {
        this.setState({ merchantName: res.data.merchant.name });
      })
      .catch((err) => console.error(err));
  };

  getMerchantOffersFromApi = (merchantId) => {
    API.get('api/offers/visell/getByMerchant?merchantId=' + merchantId)
      .then((res) => {
        this.setState({ offers: res.data.offers });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {
    const merchantId = this.state.merchantId;
    this.getProductFromApi(merchantId);
    this.getMerchantNameFromApi(merchantId);
    this.getMerchantOffersFromApi(merchantId);
  };

  componentWillReceiveProps = (nextProps) => {
    const newMerchantId = nextProps.match.params.merchantId;
    if (newMerchantId !== this.props.match.params.merchantId) {
      this.setState({ merchantId: newMerchantId });
      this.getProductFromApi(newMerchantId);
      this.getMerchantNameFromApi(newMerchantId);
      this.getMerchantOffersFromApi(newMerchantId);
    }
    const nextIsOwnerShop = nextProps.loggedInId === newMerchantId;
    if (nextIsOwnerShop !== this.state.isOwnerShop) {
      this.setState({ isOwnerShop: nextIsOwnerShop });
    }
  };

  render() {
    const { merchantId, products, isOwnerShop, merchantName, offers } = this.state;

    let headerName;

    if (isOwnerShop) {
      headerName = 'My Shop';
    } else {
      headerName = merchantName;
    }

    const content = <Table columns={columns} dataSource={offers} />;

    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Col key={0} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <Title level={4} style={{ color: '#828282' }}>
              <ShopOutlined /> {headerName}
            </Title>
          </Col>
          {isOwnerShop ? (
            <Col key={1} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <Link style={{ float: 'right' }} to={`/${merchantId}/addproduct`}>
                <StyledButton
                  type="primary"
                  size="large"
                  shape="circle"
                  style={{ float: 'right', marginRight: '20px' }}
                >
                  <PlusOutlined />
                </StyledButton>
              </Link>
              <Popover content={content}>
                <StyledButton
                  type="primary"
                  size="large"
                  shape="circle"
                  style={{ float: 'right', marginRight: '20px' }}
                >
                  <TagOutlined />
                </StyledButton>
              </Popover>
            </Col>
          ) : (
            <Col key={1} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
              <Popover content={content}>
                <AddButton type="primary" style={{ float: 'right' }}>
                  Offers
                </AddButton>
              </Popover>
            </Col>
          )}
        </Row>
        <ProductListContext.Provider value={this.state}>
          <ProductList merchantId={merchantId} products={products} isOwnerShop={isOwnerShop} />
        </ProductListContext.Provider>
      </Content>
    );
  }
}
