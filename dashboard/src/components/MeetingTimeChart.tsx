"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// This is mock data - we'll replace it with API data later
const data = [
  { date: "Mon", hours: 4.5 },
  { date: "Tue", hours: 5.2 },
  { date: "Wed", hours: 3.8 },
  { date: "Thu", hours: 6.0 },
  { date: "Fri", hours: 4.2 },
  { date: "Sat", hours: 1.5 },
  { date: "Sun", hours: 0.5 },
];

export default function MeetingTimeChart() {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Time Spent in Meetings</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF" }}
              label={{
                value: "Hours",
                angle: -90,
                position: "insideLeft",
                fill: "#9CA3AF",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F1F24",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#9CA3AF" }}
              itemStyle={{ color: "#FF3CD5" }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#FF3CD5"
              strokeWidth={2}
              dot={{ fill: "#FF3CD5", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
