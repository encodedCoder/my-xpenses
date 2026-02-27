"use client";

import { usePathname } from "next/navigation";
import { Home, BarChart3, Plus, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "add", icon: Plus, label: "Add", isFab: true },
  { id: "profile", icon: User, label: "Profile" },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export default function BottomNav({ activeTab, onTabChange, onAddClick }: BottomNavProps) {
  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom lg:hidden">
        <div className="bg-surface-900/95 backdrop-blur-xl border-t border-surface-800/80">
          <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              if (item.isFab) {
                return (
                  <button
                    key={item.id}
                    onClick={onAddClick}
                    className="relative -mt-6"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow"
                    >
                      <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </motion.div>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="flex flex-col items-center gap-1 py-2 px-5 rounded-xl transition-colors duration-200"
                >
                  <item.icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? "text-primary-400" : "text-surface-500"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium transition-colors duration-200 ${
                      isActive ? "text-primary-400" : "text-surface-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-surface-900/95 backdrop-blur-xl border-r border-surface-800/80 z-50">
        <div className="px-6 py-6 border-b border-surface-800/50">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            My Expenses
          </h1>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1">
          {navItems
            .filter((item) => !item.isFab)
            .map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                      : "text-surface-400 hover:bg-surface-800 hover:text-surface-200"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
        </div>

        <div className="px-4 pb-6">
          <button
            onClick={onAddClick}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </aside>
    </>
  );
}
