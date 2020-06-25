import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
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
  BarChart,
  Bar,
} from 'recharts';
import GridLayout from 'react-grid-layout';

const StyledDiv = styled.div`
  background: white;
  padding: 10px;
`;

const StyledContainer = styled(GridLayout)`
  position: relative;
`;

const data01 = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
  {
    name: 'Group E',
    value: 278,
  },
  {
    name: 'Group F',
    value: 189,
  },
];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 9, static: true },
      { i: 'b', x: 4, y: 0, w: 4, h: 9, static: true },
      { i: 'c', x: 9, y: 0, w: 4, h: 9, static: true },
      { i: 'd', x: 0, y: 9, w: 12, h: 13, static: true },
    ];
    return (
      <StyledContainer className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <StyledDiv key="a">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data01} dataKey="value" nameKey="name" outerRadius={110} fill="#8884d8" />
            </PieChart>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="b">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data01} dataKey="value" nameKey="name" outerRadius={110} fill="#8884d8" />
            </PieChart>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="c">
          <ResponsiveContainer width="100%" height="97%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </StyledDiv>
        <StyledDiv key="d">
          <ResponsiveContainer width="100%" height="97%">
            <BarChart
              data={data}
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
