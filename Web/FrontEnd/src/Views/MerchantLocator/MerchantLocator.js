import React, { useEffect, useState } from 'react';
import Map from './Map';
import { Row, Col, Form, Button, Input, Select, Tooltip, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import API from '../../utils/baseUrl';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Geocode from 'react-geocode';
Geocode.setApiKey('AIzaSyDD_LZoOgt7th9UQVMl2nGbJ3_N-TOvRz4');

const { Option } = Select;
const { Title } = Typography;

function MerchantLocator() {
  const [Name, setName] = useState('Starbucks');
  const [Vname, setVname] = useState('');
  const [Lat, setLat] = useState('1.3521');
  const [Lng, setLng] = useState('103.82');
  const [VisaMerch, setVisaMerch] = useState([]);
  const [Visell, setVisell] = useState([]);
  const [VisellPos, setVisellPos] = useState([]);
  const [VisellMerchants, setVisellMerchants] = useState([]);

  useEffect(() => {
    API.post('api/merchant/getAll').then((res) => {
      if (res.data.success === true) {
        let all = [];
        setVisellMerchants(res.data.merchants);
        res.data.merchants.map((merchant) => {
          Geocode.fromAddress(merchant.address).then(
            (response) => {
              const cord = response.results[0].geometry.location;
              all.push(cord);
              setVisell(all);
            },
            (error) => {
              console.error(error);
            }
          );
        });
      }
    });
  }, []);

  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };

  const onVnameChange = (value) => {
    setVname(value);
  };

  const onMerchantSubmit = (event) => {
    event.preventDefault();
    let body = { lat: Lat, lng: Lng, name: Name };
    API.post('api/merchantLocator/getAll', body)
      .then((res) => {
        if (res.success === false) {
        } else {
          let merchants = {};
          merchants = res.data.data.merchantLocatorServiceResponse.response;
          if (merchants) setVisaMerch(merchants);
        }
      })
      .catch((err) => {
        console.log('cannot fetch merchant');
      });
  };

  const setCoord = (coord) => {
    setLat(coord.lat.toString());
    setLng(coord.lng.toString());
  };

  const onVisellSubmit = (event) => {
    event.preventDefault();
    let body = { searchTerm: Vname };
    API.post('api/merchant/getAll', body).then((res) => {
      if (res.data.success === true) {
        let all = [];
        res.data.merchants.map((merchant) => {
          Geocode.fromAddress(merchant.address).then(
            (response) => {
              const cord = response.results[0].geometry.location;
              all.push(cord);
              setVisellPos(all);
            },
            (error) => {
              console.error(error);
            }
          );
        });
      }
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
        <Title level={4} style={{ color: '#828282', marginLeft: '120px' }}>
          <SearchOutlined /> Maps
        </Title>
      </Row>
      <Row gutter={16} align="middle">
        <Col span={10} style={{ marginLeft: '70px' }}>
          <Map setCoord={setCoord} visaMerch={VisaMerch} visell={Visell} visellPos={VisellPos} />
        </Col>
        <Col span={12}>
          <div style={{ margin: '0 auto', maxWidth: '600px' }}>
            <span style={{ fontSize: '25px', color: 'black', fontWeight: 500 }}>Visa Verified Merchant Locator</span>
            <Tooltip
              placement="top"
              title="Search for merchants that are Visa verified!"
              style={{ marginLeft: '10px' }}
            >
              <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
            </Tooltip>
            <Form onSubmit={onMerchantSubmit} layout={'vertical'} size={'large'}>
              <Form.Item label={<p style={{ fontSize: '20px', marginBottom: '-18px' }}>Merchant Name</p>}>
                <Input placeholder="merchant name" onChange={onNameChange} value={Name} />
              </Form.Item>
              <Button onClick={onMerchantSubmit}>Search</Button>
            </Form>
            <br />
            <br />
            <span style={{ fontSize: '25px', color: 'black', fontWeight: 500 }}>Visell Merchant Locator</span>
            <Tooltip
              placement="top"
              title="Search for Visell merchants' physical store locations!"
              style={{ marginLeft: '10px' }}
            >
              <QuestionCircleOutlined style={{ marginLeft: '10px' }} />
            </Tooltip>
            <Form onSubmit={onVisellSubmit} layout={'vertical'} size={'large'}>
              <Form.Item label={<p style={{ fontSize: '20px', marginBottom: '-18px' }}>Merchant Name</p>}>
                <Form.Item name={['visellMerchantName']} noStyle>
                  <Select
                    placeholder="Check out where some of the Visell merchants are located at"
                    onChange={onVnameChange}
                  >
                    {VisellMerchants.map((merchant) => {
                      return <Option value={merchant.name}>{merchant.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Form.Item>
              <Button onClick={onVisellSubmit}>Search</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MerchantLocator;
