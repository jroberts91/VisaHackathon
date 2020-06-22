import React from 'react';
import { Row, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { baseUrl } from '../../utils/baseUrl';


export default class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => { }

  render() {
    const images = this.props.images;

    if (images === undefined || images.length === 0) {
      return "No Image to Display"
    }

    const coverImage = baseUrl + images[0];
    const rowImages = images.slice(1);

    return (
      <div>
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Avatar shape="square" size={300} src={coverImage}/>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
        {rowImages.map((url, index) => {
          return (
            <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
            <Avatar shape="square" size={100} src={baseUrl + url}/>
            </Col>
          );
        })
        }
        </Row>
      </div>
    );
  }
}