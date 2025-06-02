import { NextResponse } from "next/server";
import type { StatsData } from "@/types";

export async function GET() {
  // Mock data - replace with actual database calls in production
  const stats: StatsData = {
    totalRevenue: 348261,
    totalOrders: 15708.98,
    totalSessions: 7415644,
    conversionRate: 10.87,
    revenueChange: 12.8,
    ordersChange: -4.75,
    sessionsChange: 1.45,
    conversionChange: 2.95,
  };

  return NextResponse.json(stats);
}
