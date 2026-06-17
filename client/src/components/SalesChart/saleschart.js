import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SalesChart({ orders }) {

  const data = orders.map((order) => ({
    name: order.customerName,
    revenue: order.totalAmount
  }));

  return (

    <div
      style={{
        width: "100%",
        height: 350,
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}
    >

      <h3>Sales Statistics</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;