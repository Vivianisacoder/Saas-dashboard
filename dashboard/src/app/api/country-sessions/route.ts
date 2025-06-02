import { NextResponse } from "next/server";
import type { CountrySession } from "@/types";

export async function GET() {
  // Mock data - replace with actual database calls in production
  const countrySessions: CountrySession[] = [
    { name: "United States", value: 45, flag: "🇺🇸" },
    { name: "United Kingdom", value: 28, flag: "🇬🇧" },
    { name: "Germany", value: 15, flag: "🇩🇪" },
    { name: "India", value: 12, flag: "🇮🇳" },
  ];

  return NextResponse.json(countrySessions);
}
