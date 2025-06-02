"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import type { AnalyticsData } from "@/types";
import { ChartSkeleton } from "./Skeleton";
import Tooltip from "./Tooltip";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: number;
    dataKey: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg shadow-lg border border-white/10">
        <p className="text-sm font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className={`text-sm ${
              entry.dataKey === "sales" ? "text-primary" : "text-primary/50"
            }`}
          >
            {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: $
            {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"1M" | "3M" | "1Y">("1M");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics data");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="card p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
            Sales Analytics
          </h3>
          <p className="text-text-secondary text-sm">
            Monthly revenue overview
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-row sm:flex-col lg:flex-row gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <Tooltip content="Actual sales">
                <div className="flex items-center gap-2 cursor-help">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm text-text-secondary">Sales</span>
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <Tooltip content="Estimated sales">
                <div className="flex items-center gap-2 cursor-help">
                  <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                  <span className="text-sm text-text-secondary">
                    Estimation
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="flex rounded-lg bg-secondary overflow-hidden w-full sm:w-auto">
            {(["1M", "3M", "1Y"] as const).map((filter) => (
              <Tooltip key={filter} content={`Last ${filter} data`}>
                <button
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-1 sm:flex-none px-3 py-1 text-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-primary text-white"
                      : "hover:bg-white/[0.05]"
                  }`}
                >
                  {filter}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.5)"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <RechartsTooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.2)" }}
            />
            <Area
              type="monotone"
              dataKey="estimation"
              stroke="rgba(147,51,234,0.3)"
              fill="rgba(147,51,234,0.1)"
              activeDot={{ r: 6, fill: "rgb(147,51,234)" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="rgb(147,51,234)"
              fill="rgba(147,51,234,0.2)"
              activeDot={{ r: 8, fill: "rgb(147,51,234)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
