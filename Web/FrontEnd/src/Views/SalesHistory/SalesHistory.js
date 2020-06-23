import React from 'react';
import { Layout, Tabs, Input, Table, Switch, Typography, Row } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';

const { Title } = Typography;

const { Content } = Layout;

const { TabPane } = Tabs;

const { Search } = Input;

const dataSource = [
  {
    key: '1',
    orderId: 29126,
    product: 'Male Salmon',
    qty: 1,
    totalPrice: 12,
    address: 'London No. 1 Lake Park',
    paidDate: '30/01/20',
    status: true,
  },
  {
    key: '2',
    orderId: 29125,
    product: 'Female Cod',
    qty: 2,
    totalPrice: 15,
    address: 'New York No. 1 Lake Park',
    paidDate: '30/01/20',
    status: false,
  },
  {
    key: '3',
    orderId: 29169,
    product: 'Purple Banana',
    qty: 3,
    totalPrice: 22,
    address: 'Sidney No. 1 Lake Park',
    paidDate: '31/01/20',
    status: false,
  },
  {
    key: '4',
    orderId: 29128,
    product: 'Female Cod',
    qty: 4,
    totalPrice: 58,
    address: 'New York No. 1 Lake Park',
    paidDate: '9/02/20',
    status: false,
  },
];

class SalesTable extends React.Component {
  generateFiters = (type) => {
    let filterList = new Set();
    for (let elm of dataSource) {
      filterList.add(elm[type]);
    }
    let filters = [];
    for (let elm of filterList) {
      filters.push({
        text: elm,
        value: elm,
      });
    }
    return filters;
  };

  render() {
    const data = [...dataSource];
    if (!this.props.statusTab) {
      for (let elm of data) {
        if (elm.status !== this.props.isFulfilled) {
          data.splice(data.indexOf(elm), 1);
        }
      }
    }

    return (
      <Table dataSource={data}>
        <Column title="OrderId" dataIndex="orderId" key="orderId" sorter={(a, b) => a.orderId - b.orderId} />
        <Column
          title="Product"
          dataIndex="product"
          key="product"
          filters={this.generateFiters('product')}
          onFilter={(value, record) => record.product.indexOf(value) === 0}
          sorter={(a, b) => a.product.localeCompare(b.product, 'en', { sensitivity: 'base' })}
        />
        <Column title="Qty" dataIndex="qty" key="qty" sorter={(a, b) => a.qty - b.qty} />
        <Column
          title="Total Price"
          dataIndex="totalPrice"
          key="totalPrice"
          render={(totalPrice) => {
            return '$' + totalPrice;
          }}
          sorter={(a, b) => a.totalPrice - b.totalPrice}
        />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
          sorter={(a, b) => a.address.localeCompare(b.address, 'en', { sensitivity: 'base' })}
        />
        <Column
          title="Paid Date"
          dataIndex="paidDate"
          key="paidDate"
          filters={this.generateFiters('paidDate')}
          onFilter={(value, record) => record.paidDate.indexOf(value) === 0}
          sorter={(a, b) => {
            let firstDate = a.paidDate.split('/');
            let firstDateObj = new Date(firstDate[2], firstDate[1] - 1, firstDate[0]);

            let secondDate = b.paidDate.split('/');
            let secondDateObj = new Date(secondDate[2], secondDate[1] - 1, secondDate[0]);
            return firstDateObj >= secondDateObj;
          }}
        />
        {this.props.statusTab && (
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => {
              return <Switch size="small" defaultChecked={status} />;
            }}
          />
        )}
      </Table>
    );
  }
}

export default class SalesHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: this.props.match.params.merchantId,
    };
  }

  componentDidMount = () => {};

  render() {
    const searchBar = <Search placeholder="input search text" onSearch={(value) => console.log(value)} enterButton />;

    return (
      <Content style={{ width: '95%', maxWidth: '1280px', margin: '0 auto' }}>
        <Row align="top" justify="space-between" style={{ margin: '30px 0 10px 0' }}>
          <Title level={4} style={{ color: '#828282' }}>
            <HistoryOutlined /> Sales History
          </Title>
        </Row>
        <Tabs defaultActiveKey="1" tabBarExtraContent={searchBar}>
          <TabPane tab="All" key="1">
            <SalesTable statusTab={true} />
          </TabPane>
          <TabPane tab="Not Fulfilled" key="2">
            <SalesTable statusTab={false} isFulfilled={false} />
          </TabPane>
          <TabPane tab="Fulfilled" key="3">
            <SalesTable statusTab={false} isFulfilled={true} />
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}
