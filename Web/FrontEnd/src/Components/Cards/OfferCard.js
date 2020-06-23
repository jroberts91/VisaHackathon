import React from 'react';
import { Card, Rate } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import MaiYuGe from '../../images/maiyuge.jpg';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../utils/baseUrl';

const { Meta } = Card;

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
      <Card style={{ width: '100%', minWidth: 250 }} hoverable>
        <Meta title={title} description={<OfferDescription description={description} />} />
      </Card>
    );
  }
}
