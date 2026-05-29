import React from "react";

import "./saleschart.css";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";

function SalesChart() {

  const data = [

    {
      month: "Jan",
      sales: 12000
    },

    {
      month: "Feb",
      sales: 18000
    },

    {
      month: "Mar",
      sales: 15000
    },

    {
      month: "Apr",
      sales: 22000
    },

    {
      month: "May",
      sales: 26000
    },

    {
      month: "Jun",
      sales: 30000
    }

  ];

  return (

    <div className="chart-container">

      <div className="chart-header">

        <h3>
          Monthly Sales Analytics
        </h3>

        <p>
          Retail POS Performance Overview
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"

            dataKey="sales"

            stroke="#2563eb"

            strokeWidth={4}

            activeDot={{
              r: 8
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;