import React from 'react';
import styled from 'styled-components';
import { Row, Col, Layout, Typography, Spin } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import OfferCard from '../../Components/Cards/OfferCard';
import API from '../../utils/baseUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const { Content } = Layout;
const { Title } = Typography;

const StyledSpin = styled(Spin)`
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
    this.state = { offers: [], notLoaded: true };
  }

  componentDidMount = () => {
    this.getOffersFromApi();
  };

  getOffersFromApi = () => {
    this.setState({ notLoaded: true });
    API.get('api/offers/list?max=' + '10')
      .then((res) => {
        console.log(res.data.Offers);
        this.setState({ notLoaded: false });
        this.setState({ offers: res.data.Offers });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { offers, notLoaded } = this.state;
    let body;

    if (notLoaded) {
      body = <StyledSpin size="large" />;
    } else {
      body = (
        <div>
          <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
            <Title level={4} style={{ color: '#828282' }}>
              <TagOutlined /> Offers
            </Title>
          </Row>
          <Title level={4}>Visa Offers</Title>
          <div
            style={{
              paddingBottom: '30px',
              position: 'relative',
            }}
          >
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              renderDotsOutside
              showDots
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {offers.map((product, index) => {
                const { programName, offerTitle, merchantName } = product;
                return (
                  <StyledOfferCard>
                    <OfferCard title={merchantName} description={offerTitle} />
                  </StyledOfferCard>
                );
              })}
            </Carousel>
          </div>
          <Title level={4}>Visell Offers</Title>
          <div
            style={{
              paddingBottom: '30px',
              position: 'relative',
            }}
          >
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              renderDotsOutside
              showDots
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {offers.map((product, index) => {
                const { programName, offerTitle, merchantName } = product;
                return (
                  <StyledOfferCard>
                    <OfferCard title={merchantName} description={offerTitle} />
                  </StyledOfferCard>
                );
              })}
            </Carousel>
          </div>
        </div>
      );
    }

    return <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>{body}</Content>;
  }
}

/*
<Row gutter={[32, 32]}>
{offers.map((product, index) => {
  const { programName, offerTitle, merchantName } = product;
  return (
    <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
      <OfferCard title={merchantName} description={offerTitle} />
    </Col>
  );
})}
</Row>*/
