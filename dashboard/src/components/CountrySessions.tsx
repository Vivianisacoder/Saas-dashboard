"use client";

import { useEffect, useState } from "react";
import type { CountrySession } from "@/types";
import Tooltip from "./Tooltip";

export default function CountrySessions() {
  const [data, setData] = useState<CountrySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/country-sessions");
        if (!res.ok) throw new Error("Failed to fetch country sessions");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching country sessions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-text-secondary">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((country) => (
        <div key={country.name} className="group">
          <Tooltip content={`${country.value}% of total sessions`}>
            <div className="flex items-center justify-between mb-2 cursor-help">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg group-hover:scale-110 transition-transform shrink-0">
                  {country.flag}
                </span>
                <span className="font-bold group-hover:text-primary transition-colors truncate">
                  {country.name}
                </span>
              </div>
              <span className="text-text-secondary group-hover:text-primary transition-colors shrink-0 ml-2 font-bold">
                {country.value}%
              </span>
            </div>
          </Tooltip>
          <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:bg-opacity-80"
              style={{ width: `${country.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
