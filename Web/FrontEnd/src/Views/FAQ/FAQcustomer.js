import React from 'react';
import styled from 'styled-components';
import { Row, Layout, Typography, Collapse } from 'antd';
import { QuestionCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import image from '../../images/feedback.png';

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
              <Panel header="How do I cancel my order?" key="1">
                <p style={{ paddingLeft: 24 }}>
                  You can send us an email
                  <Link to={`/contactUs`}> here </Link>
                  to cancel your order. Provide us the merchant name and the item you purchased.
                </p>
              </Panel>

              <Panel header="It's past the estimated delivery date and I have yet to recieve my item. How can I contact the seller?" key="2">
                <p style={{ paddingLeft: 24 }}>
                  You can send us an email
                  <Link to={`/contactUs`}> here </Link>
                  and provide us with details of your order. 
                  Expect at least 3 days of waiting time as we have many queries to look through. 
                  We apologise for the inconvenience and will reach out to the Seller for you. 
                </p>
              </Panel>
            </Collapse>
          </Row>
        </div>
      </Content>
    );
  }
}
