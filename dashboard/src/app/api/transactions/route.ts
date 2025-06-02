import { NextResponse } from "next/server";
import type { Transaction, TransactionResponse } from "@/types";

export async function GET(request: Request) {
  // Mock data - replace with actual database calls in production
  const transactions: Transaction[] = [
    {
      id: "T-1",
      product: "Tesla Model Y",
      company: "Tesla, Inc.",
      amount: 35873.22,
      date: "Nov 13, 2023",
      status: "Processing",
      user: {
        name: "Olivia Kim",
        email: "olivia@company.com",
        avatar: "👩🏻",
      },
    },
    {
      id: "M-2",
      product: "MTECH Pro",
      company: "MTECH Group, Inc.",
      amount: 15708.98,
      date: "Nov 13, 2023",
      status: "Success",
      user: {
        name: "Michael Brown",
        email: "michael@company.com",
        avatar: "👨🏽",
      },
    },
    {
      id: "D-3",
      product: "DSGN System Pro",
      company: "Design.co",
      amount: 4235.75,
      date: "Nov 12, 2023",
      status: "Success",
      user: {
        name: "Chris Martin",
        email: "chris@company.com",
        avatar: "👨🏼",
      },
    },
    {
      id: "A-4",
      product: "Apple MacBook Pro",
      company: "Apple Inc.",
      amount: 22499.99,
      date: "Oct 28, 2023",
      status: "Declined",
      user: {
        name: "Sarah Wilson",
        email: "sarah@company.com",
        avatar: "👩🏼",
      },
    },
  ];

  // Get query parameters from the URL
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const status = searchParams.get("status")?.toLowerCase() || "";

  // Filter transactions based on search and status
  let filteredTransactions = transactions;

  if (search) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        transaction.product.toLowerCase().includes(search) ||
        transaction.company.toLowerCase().includes(search) ||
        transaction.user.name.toLowerCase().includes(search) ||
        transaction.user.email.toLowerCase().includes(search)
    );
  }

  if (status) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.status.toLowerCase() === status
    );
  }

  // Add artificial delay to simulate network latency (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedTransactions = filteredTransactions.slice(start, end);

  const response: TransactionResponse = {
    transactions: paginatedTransactions,
    total: filteredTransactions.length,
    page,
    pageSize,
  };

  return NextResponse.json(response);
}
