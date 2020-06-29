import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { baseUrl } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StyledCard = styled(Card)`
  height: 250px;
`;

class OfferDescription extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.description}</div>
        <div>{this.props.code}</div>
      </div>
    );
  }
}

export default class OfferCard extends React.Component {
  render() {
    const { title, description, code, imgUrl, id } = this.props;

    const merchantHref = `/${id}`;

    return (
      <Link to={merchantHref}>
        <StyledCard
          cover={<img style={{ height: '110px', objectFit: 'cover' }} alt="example" src={imgUrl} />}
          hoverable
        >
          <Meta title={title} description={<OfferDescription code={code} description={description} />} />
        </StyledCard>
      </Link>
    );
  }
}
