import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Meta } = Card;

const StyledCard = styled(Card)`
  height: 200px;
`;

class OfferDescription extends React.Component {
  render() {
    return (
      <>
        <div>{this.props.description}</div>
      </>
    );
  }
}

export default class OfferCard extends React.Component {
  render() {
    const { title, description } = this.props;
    return (
      <StyledCard hoverable>
        <Meta title={title} description={<OfferDescription description={description} />} />
      </StyledCard>
    );
  }
}
