import React from 'react';
import styled from 'styled-components';
import { Row, Layout, Typography, Collapse } from 'antd';
import { QuestionCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const StyledImage = styled.img`
  position: relative;
  width: 70%;
  height: 50%;
  margin: 10%;
`;

export default class AddProduct extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Content style={{ maxWidth: '1280px', width: '90%', margin: '0 auto' }}>
        <div style={{ margin: '0 auto', width: '100%' }}>
          <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
            <Title level={4} style={{ color: '#828282' }}>
              <QuestionCircleOutlined /> Frequently Asked Questions
            </Title>
          </Row>

          <Row>
            <Collapse accordion
              defaultActiveKey={['1']}
              bordered={false}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              style={{ width: '100%' }}
            >
              <Panel header=" How do I promote my product? " key="1">
                <p style={{ paddingLeft: 24 }}>
                  {' '}
                  You can promote your product through various means, such as by setting up a Facebook or Instagram
                  account. You can visit
                  <a href="https://www.forbes.com/sites/allbusiness/2018/03/27/10-expert-social-media-tips-to-help-your-small-business-succeed/#32c40b7f14a1">
                    {' '}
                    this
                  </a>{' '}
                  article by Forbes to help you get started on establishing a social media presence.{' '}
                </p>
              </Panel>

              <Panel header="Where can I contact Visell for issues I have with the website?" key="2">
                <p style={{ paddingLeft: 24 }}>
                  You can send us your queries by contacting us
                  <Link to={`/contactUs`}> here</Link>.
                </p>
              </Panel>

              <Panel
                header="I'm interested in Visa loyalty programs as a merchant, how I do get more information?  "
                key="3"
              >
                <p style={{ paddingLeft: 24 }}>
                  You can visit Visa's merchant partnership and loyalty programs
                  <a href="https://www.visa.com.sg/run-your-business/commercial-solutions/solutions/merchant-marketing.html">
                    {' '}
                    here
                  </a>
                  .
                </p>
              </Panel>

              <Panel header="How do I add offers to my product?" key="4">
                <p style={{ paddingLeft: 24 }}>
                  You can send us your offers by contacting us
                  <Link to={`/contactUs`}> here</Link>. We would help you add them to your shop.
                </p>
              </Panel>
            </Collapse>
          </Row>
        </div>
      </Content>
    );
  }
}
