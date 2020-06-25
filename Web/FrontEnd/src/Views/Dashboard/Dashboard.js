import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import API from '../../utils/baseUrl';
import { defaultTheme } from '../../utils/theme';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Legend,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import GridLayout from 'react-grid-layout';

const StyledDiv = styled.div`
  background: white;
  padding: 10px;
`;

const StyledTitleContainer = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledContainer = styled(GridLayout)`
  position: relative;
`;

const StyledTotalSalesContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isMounted: false,
    };
  }

  getAllProducts() {
    // get products of this merchant (used for both pie charts)
    const body = {
      merchantId: this.props.loggedInUserId,
    };
    API.post('api/product/getAll', body)
      .then((res) => {
        if (res.data.success) {
          this.setState({ products: res.data.products });
        }
        this.setState({ isMounted: true });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 9, static: true },
      { i: 'b', x: 4, y: 0, w: 4, h: 9, static: true },
      { i: 'c', x: 9, y: 0, w: 4, h: 9, static: true },
      { i: 'd', x: 0, y: 9, w: 12, h: 13, static: true },
    ];
    if (!this.state.isMounted) {
      return null;
    }
    const { products } = this.state;

    // used in top middle pie chart
    const salesQuantityData = products.map((product) => {
      return {
        name: product.name,
        value: product.soldQty,
      };
    });

    // used in top right pie chart
    const salesAmountData = products.map((product) => {
      const amount = parseInt(product.price) * product.soldQty;
      return {
        name: product.name,
        value: amount,
      };
    });

    // used in top left total sales
    const totalSales = salesAmountData.reduce((acc, productSales) => {
      return parseInt(productSales.value) + acc;
    }, 0);

    // colors used for the pie charts
    const colorsArray = Object.values(defaultTheme.pieChartColors);

    // function to modify the label within the pie charts
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          style={{ fontWeight: 'bold' }}
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {salesAmountData[index].name}
        </text>
      );
    };
    return (
      <StyledContainer className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <StyledDiv key="a">
          <StyledTitleContainer>Total Sales</StyledTitleContainer>
          <ResponsiveContainer width="100%" height="100%">
            <StyledTotalSalesContainer>{`$${totalSales.toFixed(2)}`}</StyledTotalSalesContainer>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="b">
          <StyledTitleContainer>Sales Quantity Breakdown</StyledTitleContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {products.length > 0 ? (
                <Pie
                  data={salesQuantityData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                >
                  {salesQuantityData.map((entry, index) => (
                    <Cell key={`cell-`} fill={colorsArray[index]} />
                  ))}
                </Pie>
              ) : (
                <div>No products sold yet.</div>
              )}
            </PieChart>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="c">
          <StyledTitleContainer>Sales Amount Breakdown</StyledTitleContainer>
          <ResponsiveContainer width="100%" height="97%">
            <PieChart>
              {products.length > 0 ? (
                <Pie
                  data={salesAmountData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                >
                  {salesAmountData.map((entry, index) => (
                    <Cell key={`cell-`} fill={colorsArray[index]} />
                  ))}
                </Pie>
              ) : (
                <div>No products sold yet.</div>
              )}
            </PieChart>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="d">
          <ResponsiveContainer width="100%" height="97%">
            <BarChart
              data={salesQuantityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </StyledDiv>
      </StyledContainer>
    );
  }
}
