import React from 'react';
import { Layout, Tabs, Input, Table, Switch, Typography, Row, Button } from 'antd';
import { TagOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import API from '../../utils/baseUrl';
import Modal from 'antd/lib/modal/Modal';

const { Title } = Typography;

const { Content } = Layout;

const { TabPane } = Tabs;

const { Search } = Input;

export default class MerchantOffers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.merchantId,
      showDeleteModal: false,
      currentOfferId: '',
    };
  }

  getMerchantOffersFromApi = (merchantId) => {
    API.get(`api/offers/visell/getByMerchant?merchantId=${merchantId}`)
      .then((res) => {
        console.log(res.data.offers);
        this.setState({ offers: res.data.offers });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {
    const merchantId = this.state.merchantId;
    this.getMerchantOffersFromApi(merchantId);
  };

  toggleModal = (value) => {
    this.setState({ currentOfferId: value, showDeleteModal: true });
  };

  deleteOffer = () => {
    const { currentOfferId } = this.state;
    console.log(currentOfferId);
    const body = {
      offerId: currentOfferId,
    };
    API.post('api/offers/visell/delete', body)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.setState({ showDeleteModal: false });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { offers, showDeleteModal } = this.state;

    const columns = [
      {
        title: 'Offer',
        dataIndex: 'offerName',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Minimum Spent',
        dataIndex: 'minValue',
      },
      {
        title: 'Used',
        dataIndex: 'quantityUsed',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Delete',
        dataIndex: '_id',
        render: (values) => {
          return (
            <Button type="primary" shape="circle" danger onClick={() => this.toggleModal(values)}>
              <DeleteOutlined />
            </Button>
          );
        },
      },
    ];

    return (
      <div>
        <Modal
          title="Confirmation"
          visible={showDeleteModal}
          onOk={this.deleteOffer}
          onCancel={() => this.setState({ showDeleteModal: false })}
          style={{ textAlign: 'center' }}
          okText="Yes"
          cancelText="No"
        >
          Are you sure you want to delete this offer?
        </Modal>
        <Content style={{ width: '95%', maxWidth: '1280px', margin: '0 auto' }}>
          <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
            <Title level={4} style={{ color: '#828282' }}>
              <TagOutlined /> My Offers
            </Title>
          </Row>
          <Tabs defaultActiveKey="1">
            <TabPane tab="All" key={1}>
              <Table columns={columns} dataSource={offers} />
            </TabPane>
          </Tabs>
        </Content>
      </div>
    );
  }
}
