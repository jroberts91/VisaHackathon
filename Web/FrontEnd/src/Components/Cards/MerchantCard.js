import React from 'react';
import { Card, Rate } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import MaiYuGe from '../../images/maiyuge.jpg';
import 'antd/dist/antd.css';

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
    };
  }

  componentDidMount = () => {};

  render() {
    const { imageUrl, title, description, rating } = this.state;
    return (
      <Card
        style={{ width: '100%', minWidth: 250 }}
        cover={<img alt="example" src={imageUrl || MaiYuGe} />}
        hoverable
        actions={[<HomeOutlined key="visit" />]}
        tabBarExtraContent={<Rate value={rating} />}
      >
        <Meta title={title} description={<MerchantDescription description={description} rating={rating} />} />
      </Card>
    );
  }
}
