import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import Tooltip from "./Tooltip";

interface StatsCardProps {
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  change?: number;
  icon?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  icon,
}: StatsCardProps) {
  return (
    <div className="card p-4 lg:p-6 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-secondary text-sm">{title}</h3>
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-text-secondary text-sm">{prefix}</span>
          <span className="text-2xl font-semibold">{value}</span>
          <span className="text-text-secondary text-sm">{suffix}</span>
        </div>
        {typeof change === "number" && (
          <Tooltip
            content={`${Math.abs(change)}% ${
              change >= 0 ? "increase" : "decrease"
            } from last period`}
          >
            <div
              className={`flex items-center gap-1 text-sm cursor-help ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
