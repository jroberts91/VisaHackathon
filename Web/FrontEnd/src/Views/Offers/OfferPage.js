import React from 'react';
import styled from 'styled-components';
import { Row, Layout, Typography, Spin, Modal, Button } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import OfferCard from '../../Components/Cards/OfferCard';
import API from '../../utils/baseUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

const { Content } = Layout;
const { Title } = Typography;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  left: 50%;
  top: 50%;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const StyledOfferCard = styled.div`
  padding-right: 10px;
`;

export default class OfferPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offers: [], visellOffers: [], notLoaded: true, visible: false, loading: true };
  }

  componentDidMount = () => {
    this.getVisellOffersFromApi();
    this.getVisaOffersFromApi();
  };

  showModal = (product) => {
    const { merchantName, offerTitle, promotionFromDateTime, promotionToDateTime } = product;
    console.log(merchantName);
    console.log(offerTitle);
    this.setState({
      visible: true,
      modalHeader: merchantName,
      modalOfferTitle: offerTitle,
      modalStartDate: promotionFromDateTime,
      modalEndDate: promotionToDateTime,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  getVisellOffersFromApi = () => {
    API.get(`api/offers/visell/list`)
      .then((res) => {
        console.log('This are the visell offers ', res.data.offers);
        this.setState({ visellOffers: res.data.offers });
      })
      .catch((err) => console.error(err));
  };

  getVisaOffersFromApi = () => {
    this.setState({ notLoaded: true });
    API.get(`api/offers/list?max=${10}`)
      .then((res) => {
        console.log(res.data.Offers);
        this.setState({ notLoaded: false });
        this.setState({ offers: res.data.Offers });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { offers, notLoaded, visellOffers, modalHeader, modalOfferTitle, modalStartDate, modalEndDate } = this.state;
    let body;

    if (notLoaded) {
      body = <PulseLoader css={override} size={30} color={'#123abc'} />;
    } else {
      body = (
        <div>
          <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
            <Title level={4} style={{ color: '#828282' }}>
              <TagOutlined /> Offers
            </Title>
          </Row>
          <Title level={4}>Visell</Title>
          <div
            style={{
              paddingBottom: '30px',
              position: 'relative',
            }}
          >
            <Carousel
              swipeable={false}
              draggable={false}
              minimumTouchDrag={80}
              responsive={responsive}
              renderDotsOutside
              showDots
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {visellOffers.map((visellOffer, index) => {
                const { merchantName, profileImage, merchantId, description, code } = visellOffer;
                const thisCode = `Code: ${code}`;
                return (
                  <StyledOfferCard>
                    <OfferCard
                      title={merchantName}
                      code={thisCode}
                      description={description}
                      imgUrl={profileImage}
                      id={merchantId}
                    />
                  </StyledOfferCard>
                );
              })}
            </Carousel>
          </div>
          <Title level={4}>Visa</Title>
          <div
            style={{
              paddingBottom: '30px',
              position: 'relative',
            }}
          >
            <Carousel
              swipeable={false}
              draggable={false}
              minimumTouchDrag={80}
              responsive={responsive}
              renderDotsOutside
              showDots
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {offers.map((product, index) => {
                const { offerTitle, merchantName } = product;
                console.log(product);
                const imgUrl = product.imageList[0] ? product.imageList[0].fileLocation : null;
                return (
                  <StyledOfferCard onClick={() => this.showModal(product)}>
                    <OfferCard title={merchantName} description={offerTitle} imgUrl={imgUrl} />
                  </StyledOfferCard>
                );
              })}
            </Carousel>
          </div>
          <Modal title={modalHeader} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <p>{modalOfferTitle}</p>
            <p>Start Date: {modalStartDate}</p>
            <p>End Date: {modalEndDate}</p>
          </Modal>
        </div>
      );
    }

    return <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>{body}</Content>;
  }
}
