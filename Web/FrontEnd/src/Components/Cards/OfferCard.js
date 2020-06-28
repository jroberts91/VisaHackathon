import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { baseUrl } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StyledCard = styled(Card)`
  height: 220px;
`;

class OfferDescription extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.offer}</div>
        <div>{this.props.description}</div>
      </div>
    );
  }
}

export default class OfferCard extends React.Component {
  render() {
    const { title, description, offer, imgUrl, id } = this.props;
    const fullImageUrl = imgUrl ? baseUrl + imgUrl : baseUrl + 'uploads\\1592987488416_FB_IMG_1589391975282.jpg';

    const merchantHref = `/${id}`;

    return (
      <Link to={merchantHref}>
        <StyledCard
          cover={<img style={{ height: '110px', objectFit: 'cover' }} alt="example" src={fullImageUrl} />}
          hoverable
        >
          <Meta title={title} description={<OfferDescription description={description} offer={offer} />} />
        </StyledCard>
      </Link>
    );
  }
}
