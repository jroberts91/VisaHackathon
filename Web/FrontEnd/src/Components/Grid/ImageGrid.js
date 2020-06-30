import React from 'react';
import { Row, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { baseUrl } from '../../utils/baseUrl';

export default class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  componentDidMount = () => {};

  render() {
    const { images } = this.props;

    if (images === undefined || images.length === 0) {
      return 'No Image to Display';
    }

    const coverImage = baseUrl + images[this.state.imageIndex];

    return (
      <div>
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Avatar shape="square" size={300} icon={<img alt="Img" style={{ cursor: 'pointer' }} src={coverImage} />} />
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          {images.map((url, index) => {
            if (index === this.state.imageIndex) {
              return null;
            }
            return (
              <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
                <Avatar
                  shape="square"
                  size={100}
                  icon={
                    <img
                      alt="Img"
                      onClick={() => {
                        this.setState({ imageIndex: index });
                      }}
                      src={baseUrl + url}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
