import React, { useState, useEffect } from 'react';
import API from '../../utils/baseUrl';
import { LineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

function Linechart(props) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    let data = {};
    for (var i = 13; i >= 0; i--) {
      let index = {};
      let d = new Date(Date.now() - 864e5 * i);
      index.time = d;
      index.Revenue = 0;
      let key = d.getDate() + d.getMonth() * 28;
      data[key] = index;
    }
    let body = { merchantId: props.id };
    API.post('api/order/getAll', body)
      .then((res) => {
        let arr = res.data.orders;
        if (arr) {
          let d = new Date(Date.now() - 864e5 * 13);
          arr.map((order) => {
            let orderDate = new Date(order.payment.dateTime);
            if (orderDate >= d) {
              let totalPrice = order.quantity * order.product.price;
              let key = orderDate.getDate() + orderDate.getMonth() * 28;
              data[key].Revenue += totalPrice;
            }
          });
          let toBeSetData = [];
          for (const [key, value] of Object.entries(data)) {
            value.time = value.time.toLocaleDateString();
            toBeSetData.push(value);
          }
          setData(toBeSetData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatX = (item) => {
    return item.toString();
  };

  return (
    <ResponsiveContainer width="100%" height="97%">
      <LineChart data={Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Revenue" stroke="#192061" strokeWidth="3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Linechart;
