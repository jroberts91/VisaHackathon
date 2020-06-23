import React from 'react';
import { Row, Col, Layout, Typography } from 'antd';
import OfferCard from '../../Components/Cards/OfferCard';
import API from '../../utils/baseUrl';

const { Content } = Layout;
const { Title } = Typography;

export default class OfferPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
  }

  componentDidMount = () => {
    this.getOffersFromApi();
  };

  getOffersFromApi = () => {
    API.get('api/offers/list?max=' + '10')
      .then((res) => {
        console.log(res.data.Offers);
        this.setState({ offers: res.data.Offers });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { offers } = this.state;
    return (
      <Content style={{ maxWidth: '1280px', margin: '0 auto', width: '90%' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            Offers
          </Title>
        </Row>
        <Row gutter={[32, 32]}>
          {offers.map((product, index) => {
            const { programName, offerTitle } = product;
            return (
              <Col key={index} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} span={24}>
                <OfferCard title={programName} description={offerTitle} />
              </Col>
            );
          })}
        </Row>
      </Content>
    );
  }
}
