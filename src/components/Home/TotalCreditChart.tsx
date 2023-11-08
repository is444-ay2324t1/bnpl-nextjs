import { useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
const TotalCreditData = [
  { status: "Available", credit: 400 },
  { status: "Order 1", credit: 300 },
  { status: "Order 2", credit: 300 },
  { status: "Order 3", credit: 200 },
];

const COLORS = ["#14532d", "#166534", "#16a34a", "#22c55e", "#86efac"];

export const TotalCreditChart = () => {
  // TODO: when selectedPreiod changes, fetch new data and memoize it
  return (
    <div className="w-full space-y-2 rounded-xl border lg:w-1/2">
      <div className="flex flex-col items-center justify-center font-bold"></div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart className="">
          <Pie
            nameKey="status"
            data={TotalCreditData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="credit"
            label
          >
            {TotalCreditData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
