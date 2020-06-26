import React from 'react';
import styled from 'styled-components';
import API from '../../utils/baseUrl';
import { defaultTheme } from '../../utils/theme';
import { renderActiveShapeSalesQuantity, renderActiveShapeSalesAmount } from './pieChartUtils';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import GridLayout from 'react-grid-layout';
import Linechart from './Linechart';

// note: the following calculations are to overwrite the auto resize of react-grid-layout
const StyledDiv = styled.div`
  background: white;
  padding: 10px;
  min-width: 32.25%;
  left: ${(props) => (props.index === 0 ? 0.83333 : props.index === 1 ? 33.9167 : 66.9167)}% !important;
`;

const StyledDivBottom = styled.div`
  left: 0.833333% !important;
  min-width: 98.3333%;
`;

const StyledBreadCrumbsContainer = styled.div`
  font-size: 35px;
  left: 0.833333%;
  font-weight: bold;
  padding: 15px;
`;

const StyledTitleContainer = styled.div`
  font-size: 30px;
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
      activeIndexSalesAmount: 0,
      activeIndexSalesQuantity: 0,
    };
  }

  onSalesAmountPieEnter = (data, index) => {
    this.setState({
      activeIndexSalesAmount: index,
    });
  };

  onSalesQuantityPieEnter = (data, index) => {
    this.setState({
      activeIndexSalesQuantity: index,
    });
  };

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
      { i: 'a', x: 0, y: 0, w: 4, h: 9, minW: 4, useCSSTransforms: false, static: true },
      { i: 'b', x: 4, y: 0, w: 4, h: 9, minW: 4, useCSSTransforms: false, static: true },
      { i: 'c', x: 8, y: 0, w: 4, h: 9, minW: 4, useCSSTransforms: false, static: true },
      { i: 'd', x: 0, y: 9, w: 12, h: 13, minW: 12, useCSSTransforms: false, static: true },
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

    return (
      <>
        <StyledBreadCrumbsContainer>Dashboard</StyledBreadCrumbsContainer>
        <StyledContainer
          className="layout"
          layout={layout}
          isResizable={false}
          useCSSTransforms={false}
          isDraggable={false}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <StyledDiv key="a" index={0}>
            <StyledTitleContainer>Total Sales</StyledTitleContainer>
            <ResponsiveContainer width="90%" height="90%">
              <StyledTotalSalesContainer>{`$${totalSales.toFixed(2)}`}</StyledTotalSalesContainer>
            </ResponsiveContainer>
          </StyledDiv>
          <StyledDiv key="b" index={1}>
            <StyledTitleContainer>Sales Quantity Breakdown</StyledTitleContainer>
            <ResponsiveContainer width="90%" height="90%">
              <PieChart>
                {products.length > 0 ? (
                  <Pie
                    data={salesQuantityData}
                    labelLine={false}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    startAngle={0}
                    endAngle={360}
                    activeIndex={this.state.activeIndexSalesQuantity}
                    activeShape={renderActiveShapeSalesQuantity}
                    onMouseEnter={this.onSalesQuantityPieEnter}
                  >
                    {salesQuantityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorsArray[index]} />
                    ))}
                  </Pie>
                ) : (
                  <div>No products sold yet.</div>
                )}
              </PieChart>
            </ResponsiveContainer>
          </StyledDiv>
          <StyledDiv key="c" index={2}>
            <StyledTitleContainer>Sales Amount Breakdown</StyledTitleContainer>
            <ResponsiveContainer width="90%" height="90%">
              <PieChart>
                {products.length > 0 ? (
                  <Pie
                    data={salesAmountData}
                    labelLine={false}
                    dataKey="value"
                    nameKey="name"
                    startAngle={360}
                    endAngle={0}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    activeIndex={this.state.activeIndexSalesAmount}
                    activeShape={renderActiveShapeSalesAmount}
                    onMouseEnter={this.onSalesAmountPieEnter}
                  >
                    {salesAmountData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorsArray[index]} />
                    ))}
                  </Pie>
                ) : (
                  <div>No products sold yet.</div>
                )}
              </PieChart>
            </ResponsiveContainer>
          </StyledDiv>
          <StyledDivBottom key="d">
            <Linechart id={this.props.loggedInUserId} />
          </StyledDivBottom>
        </StyledContainer>
      </>
    );
  }
}
