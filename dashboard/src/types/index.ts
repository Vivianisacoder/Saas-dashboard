export interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  totalSessions: number;
  conversionRate: number;
  revenueChange: number;
  ordersChange: number;
  sessionsChange: number;
  conversionChange: number;
}

export interface AnalyticsData {
  month: string;
  sales: number | null;
  estimation: number;
}

export interface CountrySession {
  name: string;
  value: number;
  flag: string;
}

export interface Transaction {
  id: string;
  product: string;
  company: string;
  amount: number;
  date: string;
  status: "Processing" | "Success" | "Declined";
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}
