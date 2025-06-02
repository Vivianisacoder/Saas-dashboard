"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-secondary rounded-lg hover:bg-white/[0.05] transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-white/[0.05] transition-transform duration-300 ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
              onClick={() => setIsCollapsed(true)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-white" : "hover:bg-white/[0.05]"
                  }`}
                  onClick={() => setIsCollapsed(true)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/[0.05]">
            <Link
              href="/profile"
              className="flex items-center gap-3 hover:bg-white/[0.05] p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                👨🏻‍💻
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-text-secondary">Admin</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
