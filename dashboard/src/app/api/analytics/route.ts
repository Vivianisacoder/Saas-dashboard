import { NextResponse } from "next/server";
import type { AnalyticsData } from "@/types";

export async function GET() {
  // Mock data - replace with actual database calls in production
  const analyticsData: AnalyticsData[] = [
    { month: "Jan", sales: 4000, estimation: 2400 },
    { month: "Feb", sales: 3000, estimation: 1398 },
    { month: "Mar", sales: 2000, estimation: 9800 },
    { month: "Apr", sales: 2780, estimation: 3908 },
    { month: "May", sales: 1890, estimation: 4800 },
    { month: "Jun", sales: 2390, estimation: 3800 },
    { month: "Jul", sales: 3490, estimation: 4300 },
    { month: "Aug", sales: 4000, estimation: 2400 },
    { month: "Sep", sales: 3000, estimation: 1398 },
    { month: "Oct", sales: 2000, estimation: 9800 },
    { month: "Nov", sales: 2780, estimation: 3908 },
    { month: "Dec", sales: 3890, estimation: 4800 },
  ];

  return NextResponse.json(analyticsData);
}
