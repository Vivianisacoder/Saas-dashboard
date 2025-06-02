"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, Search, Download } from "lucide-react";
import type { Transaction } from "@/types";
import { TableSkeleton } from "./Skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import Tooltip from "./Tooltip";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-success/10 text-success hover:bg-success/20";
      case "processing":
        return "bg-warning/10 text-warning hover:bg-warning/20";
      case "declined":
        return "bg-danger/10 text-danger hover:bg-danger/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <Tooltip content={`Transaction ${status}`}>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors cursor-help ${getStatusStyles(
          status
        )}`}
      >
        {status}
      </span>
    </Tooltip>
  );
};

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: "10",
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(status && { status }),
        });

        const res = await fetch(`/api/transactions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data.transactions);
        setTotalPages(Math.ceil(data.total / data.pageSize));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [page, debouncedSearch, status]);

  const renderMobileCard = (transaction: Transaction) => (
    <div
      key={transaction.id}
      className="p-4 border-b border-white/[0.05] last:border-b-0"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-bold text-sm mb-0.5">{transaction.product}</p>
          <p className="text-text-secondary text-xs">{transaction.company}</p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="text-text-secondary text-sm">
          {formatDate(transaction.date)}
        </div>
        <div className="font-bold">{formatCurrency(transaction.amount)}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
            {transaction.user.avatar}
          </div>
          <div className="text-sm">
            <p className="font-bold">{transaction.user.name}</p>
            <p className="text-text-secondary text-xs">
              {transaction.user.email}
            </p>
          </div>
        </div>
        <button className="p-1 hover:bg-white/[0.05] rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </div>
  );

  if (loading && transactions.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 border-b border-white/[0.05] gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
            Transaction History
          </h3>
          <p className="text-text-secondary text-sm">
            Latest order transactions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all hover:bg-white/[0.05]"
            />
          </div>
          <Tooltip content="Filter by status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all hover:bg-white/[0.05] cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="processing">Processing</option>
              <option value="declined">Declined</option>
            </select>
          </Tooltip>
          <Tooltip content="Download transaction history">
            <button className="w-full sm:w-auto px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span className="sm:hidden lg:inline">Download</span>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block sm:hidden">
        {transactions.map(renderMobileCard)}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm">
                  Added by
                </th>
                <th className="text-left py-4 px-6 text-text-secondary font-medium text-sm w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="group border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6">
                    <Tooltip content={`View ${transaction.product} details`}>
                      <div className="cursor-pointer">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {transaction.product}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {transaction.company}
                        </p>
                      </div>
                    </Tooltip>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    <Tooltip content={formatDate(transaction.date)}>
                      <span className="cursor-help">
                        {formatDate(transaction.date)}
                      </span>
                    </Tooltip>
                  </td>
                  <td className="py-4 px-6">
                    <Tooltip content="Transaction amount">
                      <span className="font-medium cursor-help">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </Tooltip>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="py-4 px-6">
                    <Tooltip content={`${transaction.user.email}`}>
                      <div className="flex items-center gap-3 cursor-pointer group/user">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg group-hover/user:bg-primary/20 transition-colors">
                          {transaction.user.avatar}
                        </div>
                        <div className="hidden sm:block">
                          <p className="font-medium group-hover/user:text-primary transition-colors">
                            {transaction.user.name}
                          </p>
                          <p className="text-text-secondary text-sm">
                            {transaction.user.email}
                          </p>
                        </div>
                      </div>
                    </Tooltip>
                  </td>
                  <td className="py-4 px-6">
                    <Tooltip content="More options">
                      <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-text-secondary" />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-white/[0.05] gap-4">
          <Tooltip content="Previous page">
            <button
              className="w-full sm:w-auto px-4 py-2 bg-secondary rounded-lg text-sm disabled:opacity-50 hover:bg-white/[0.05] transition-colors"
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
          </Tooltip>
          <span className="text-text-secondary order-first sm:order-none">
            Page {page} of {totalPages}
          </span>
          <Tooltip content="Next page">
            <button
              className="w-full sm:w-auto px-4 py-2 bg-secondary rounded-lg text-sm disabled:opacity-50 hover:bg-white/[0.05] transition-colors"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || loading}
            >
              Next
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
