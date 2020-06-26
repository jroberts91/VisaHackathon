import React, {useState, useEffect} from 'react'
import API from '../../utils/baseUrl';
import {LineChart, XAxis,YAxis,Tooltip,Line, CartesianGrid,ResponsiveContainer,Legend} from 'recharts'

function Linechart(props) {
    const [Data, setData] = useState([]);

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const formatX = (item)=>{
        return item.toString()
    }

    return (
        <ResponsiveContainer width="100%" height="97%">
            <LineChart data={Data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" 
                tickFormatter={formatX}
                />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#192061" strokeWidth='3'/>
            </LineChart>
        </ResponsiveContainer>   
    )
}

export default Linechart
