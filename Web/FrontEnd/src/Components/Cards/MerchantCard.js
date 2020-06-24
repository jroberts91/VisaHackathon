import React from 'react';
import { Card, Rate } from 'antd';
import MaiYuGe from '../../images/maiyuge.jpg';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../utils/baseUrl';

const { Meta } = Card;

class MerchantDescription extends React.Component {
  render() {
    return (
      <>
        <div>{this.props.description}</div>
        <Rate value={this.props.rating} disabled />
      </>
    );
  }
}

export default class MerchantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      imageUrl: this.props.imageUrl,
      description: this.props.description,
      rating: this.props.rating,
      id: this.props.id,
    };
  }

  componentDidMount = () => {};

  render() {
    const { imageUrl, title, description, rating, id } = this.state;
    const fullImageUrl = imageUrl ? baseUrl + imageUrl : undefined;
    const merchantHref = `/${id}`;
    return (
      <Link to={merchantHref}>
        <Card
          style={{ width: '100%', minWidth: 250 }}
          cover={<img style={{ height: '200px', objectFit: 'cover' }} alt="example" src={fullImageUrl || MaiYuGe} />}
          hoverable
        >
          <Meta title={title} description={<MerchantDescription description={description} rating={rating || 5} />} />
        </Card>
      </Link>
    );
  }
}
