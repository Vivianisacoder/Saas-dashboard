import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import CountrySessions from "@/components/CountrySessions";
import TransactionTable from "@/components/TransactionTable";
import Footer from "@/components/Footer";
import { DollarSign, Users, ArrowUpRight, Percent } from "lucide-react";
import type { StatsData } from "@/types";

// This is a Server Component that fetches data on the server
async function getStats() {
  try {
    // In production, use full URL
    const res = await fetch("http://localhost:3000/api/stats", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return default data in case of error
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalSessions: 0,
      conversionRate: 0,
      revenueChange: 0,
      ordersChange: 0,
      sessionsChange: 0,
      conversionChange: 0,
    };
  }
}

export default async function Home() {
  // Fetch data on the server
  const stats: StatsData = await getStats();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-2xl font-bold tracking-tight mb-1">
                  Dashboard
                </h1>
                <p className="text-text-secondary text-sm sm:text-base">
                  Overview of your business metrics
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="hidden sm:inline">
                    30 Aug - 15 Dec, 2024
                  </span>
                  <button className="w-full sm:w-auto px-4 py-2 bg-secondary rounded-lg hover:bg-white/[0.05] transition-colors">
                    Filter Date Range
                  </button>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatsCard
                title="Total Revenue"
                value={stats.totalRevenue.toString()}
                prefix="$"
                change={stats.revenueChange}
                icon={<DollarSign className="w-5 h-5 text-primary" />}
              />
              <StatsCard
                title="Total Orders"
                value={stats.totalOrders.toString()}
                prefix="$"
                change={stats.ordersChange}
                icon={<ArrowUpRight className="w-5 h-5 text-primary" />}
              />
              <StatsCard
                title="Total Sessions"
                value={stats.totalSessions.toString()}
                change={stats.sessionsChange}
                icon={<Users className="w-5 h-5 text-primary" />}
              />
              <StatsCard
                title="Conversion Rate"
                value={stats.conversionRate.toString()}
                suffix="%"
                change={stats.conversionChange}
                icon={<Percent className="w-5 h-5 text-primary" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2">
                <AnalyticsChart />
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Session by Country
                </h3>
                <CountrySessions />
              </div>
            </div>

            <TransactionTable />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
