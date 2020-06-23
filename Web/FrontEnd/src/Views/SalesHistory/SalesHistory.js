import React from 'react';

import { Layout, Tabs, Input, Table, Switch } from 'antd';
import Column from 'antd/lib/table/Column';
import API from '../../utils/baseUrl';
import Modal from 'antd/lib/modal/Modal';

const { Content } = Layout;

const { TabPane } = Tabs;

const { Search } = Input;

class SalesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.merchantId,
      orders: [],
      isShowConfirmation: false,
      orderId: null,
    };
  }

  componentDidMount = () => {
    const body = {
      merchantId: this.state.merchantId,
      fulfilled: 'all',
    };
    API.post('api/order/getAll', body)
      .then((res) => {
        this.setState({ orders: res.data.orders });
      })
      .catch((err) => console.error(err));
  };

  handleOk = () => {
    this.setState({ isShowConfirmation: false });
    this.changeFulfilledStatus();
  };

  handleCancel = () => {
    this.setState({ isShowConfirmation: false });
  };

  changeFulfilledStatus = () => {
    const body = {
      orderId: this.state.orderId,
    };
    API.post('api/order/fulfill', body)
      .then((res) => {
        const body = {
          merchantId: this.state.merchantId,
          fulfilled: 'all',
        };
        API.post('api/order/getAll', body)
          .then((res) => {
            this.setState({ orders: res.data.orders });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  generateNameFilter = (data) => {
    let filterSet = new Set();
    for (let elm of data) {
      filterSet.add(elm.product.name);
    }
    let filters = [];
    for (let elm of filterSet) {
      filters.push({
        text: elm,
        value: elm,
      });
    }

    return filters;
  };

  generateDateFiter = (data) => {
    let filterSet = new Set();
    for (let elm of data) {
      let date = elm.product.createdAt;
      filterSet.add(this.formatDateWithoutTime(date));
    }
    let filters = [];
    for (let elm of filterSet) {
      filters.push({
        text: elm,
        value: elm,
      });
    }
    return filters;
  };

  formatDateWithoutTime = (dateTime) => {
    let date = new Date(dateTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  };

  formatDate = (dateTime) => {
    let date = new Date(dateTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '  ' + strTime;
  };

  render() {
    const { orders } = this.state;
    let data = orders ? orders : [];
    let dataSource = [];
    if (!this.props.statusTab) {
      for (let elm of data) {
        if (elm.isFulfilled === this.props.isFulfilled) {
          dataSource.push(elm);
        }
      }
    } else {
      dataSource = data;
    }
    const key = this.props.statusTab ? 0 : this.props.isFulfilled ? 2 : 1;

    return (
      <div>
        <Modal
          title="Confirmation"
          visible={this.state.isShowConfirmation}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ textAlign: 'center' }}
          okText="Yes"
          cancelText="No"
        >
          Are you sure the order is fulfilled?
        </Modal>
        <Table key={key} dataSource={dataSource}>
          <Column key={0} title="OrderId" dataIndex="_id" sorter={(a, b) => a._id - b._id} />
          <Column
            key={1}
            title="Product"
            dataIndex={['product', 'name']}
            filters={this.generateNameFilter(data)}
            onFilter={(value, record) => record.product.name.indexOf(value) === 0}
            sorter={(a, b) => a.product.name.localeCompare(b.product.name, 'en', { sensitivity: 'base' })}
          />
          <Column key={2} title="Qty" dataIndex="quantity" sorter={(a, b) => a.quantity - b.quantity} />
          <Column
            key={3}
            title="Total Price"
            dataIndex={['product', 'price']}
            render={(totalPrice) => {
              return '$' + totalPrice.toFixed(2);
            }}
            sorter={(a, b) => a.product.price - b.product.price}
          />
          <Column
            key={4}
            title="Address"
            dataIndex="address"
            key="address"
            sorter={(a, b) => a.address.localeCompare(b.address, 'en', { sensitivity: 'base' })}
          />
          <Column
            key={5}
            title="Paid Date"
            dataIndex={['product', 'createdAt']}
            render={(dateTime) => {
              return this.formatDate(dateTime);
            }}
            filters={this.generateDateFiter(data)}
            onFilter={(value, record) => this.formatDateWithoutTime(record.product.createdAt).indexOf(value) === 0}
            sorter={(a, b) => {
              let firstDateObj = new Date(a.product.createdAt);
              let secondDateObj = new Date(b.product.createdAt);
              return firstDateObj - secondDateObj;
            }}
          />
          {this.props.statusTab && (
            <Column
              key={6}
              title="Status"
              dataIndex="isFulfilled"
              render={(text, record) => {
                return (
                  <Switch
                    size="small"
                    checked={text}
                    disabled={text}
                    onChange={() => this.setState({ isShowConfirmation: true, orderId: record._id })}
                  />
                );
              }}
            />
          )}
        </Table>
      </div>
    );
  }
}

export default class SalesHistory extends React.Component {
  render() {
    const { merchantId } = this.props.match.params;
    const searchBar = <Search placeholder="input search text" onSearch={(value) => console.log(value)} enterButton />;

    return (
      <Content style={{ width: '95%', maxWidth: '1280px', margin: '0 auto' }}>
        <Tabs defaultActiveKey="1" tabBarExtraContent={searchBar}>
          <TabPane tab="All" key={1}>
            <SalesTable statusTab={true} merchantId={merchantId} />
          </TabPane>
          <TabPane tab="Not Fulfilled" key={2}>
            <SalesTable statusTab={false} merchantId={merchantId} isFulfilled={false} />
          </TabPane>
          <TabPane tab="Fulfilled" key={3}>
            <SalesTable statusTab={false} merchantId={merchantId} isFulfilled={true} />
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}
