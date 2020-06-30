import React from 'react';
import { Card, Button } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import API, { baseUrl } from '../../utils/baseUrl';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StyledCard = styled(Card)`
  height: 250px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  color: #1a1f71;
`;

class OfferDescription extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.description}</div>
        <div>{this.props.code && <StyledButton type="link">Go to Shop</StyledButton>}</div>
      </div>
    );
  }
}

export default class OfferCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  componentDidMount = () => {
    this.getMerchant();
  };

  getMerchant = () => {
    API.get(`api/merchant/get?id=${this.props.id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ url: res.data.merchant.profileImage });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { title, description, code, imgUrl, id } = this.props;

    const fullImageUrl = imgUrl ? imgUrl : baseUrl + this.state.url;

    const merchantHref = id ? `/${id}` : `/offers`;

    return (
      <Link to={merchantHref}>
        <StyledCard
          cover={<img style={{ height: '110px', objectFit: 'cover' }} alt="example" src={fullImageUrl} />}
          hoverable
        >
          <Meta title={title} description={<OfferDescription code={code} description={description} />} />
        </StyledCard>
      </Link>
    );
  }
}
