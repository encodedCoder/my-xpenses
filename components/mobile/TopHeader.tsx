"use client";

import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LogOut, Info } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface TopHeaderProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

export default function TopHeader({ currentMonth, currentYear, onMonthChange }: TopHeaderProps) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-950/90 backdrop-blur-xl border-b border-surface-800/50">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: App Title (hidden on desktop since sidebar has it) */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white lg:hidden">My Expenses</h1>
            <h1 className="text-xl sm:text-2xl font-bold text-white hidden lg:block">Dashboard</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <button
                onClick={handlePrevMonth}
                className="text-surface-400 hover:text-white text-sm p-1 rounded-lg hover:bg-surface-800 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setShowMonthPicker(!showMonthPicker)}
                className="flex items-center gap-1.5 text-surface-400 text-sm hover:text-surface-200 transition-colors"
              >
                {MONTHS[currentMonth - 1]} {currentYear}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="text-surface-400 hover:text-white text-sm p-1 rounded-lg hover:bg-surface-800 transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary-500/50 transition-all hover:border-primary-400 hover:shadow-glow"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-primary flex items-center justify-center text-white font-semibold">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-14 z-50 glass-card p-2 min-w-[200px] animate-scale-in shadow-elevated">
                  <div className="px-3 py-2.5 border-b border-surface-700/50">
                    <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
                    <p className="text-xs text-surface-400 truncate">{session?.user?.email}</p>
                  </div>
                  <Link
                    href="/about"
                    onClick={() => setShowMenu(false)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 mt-1 text-sm text-surface-300 hover:bg-surface-800 rounded-lg transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    About My Expenses
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-2 px-3 py-2.5 mt-1 text-sm text-red-400 hover:bg-surface-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Month picker dropdown */}
        {showMonthPicker && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowMonthPicker(false)} />
            <div className="absolute left-4 right-4 sm:left-auto sm:right-auto sm:w-80 top-[72px] z-40 glass-card p-4 animate-scale-in shadow-elevated">
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      onMonthChange(index + 1, currentYear);
                      setShowMonthPicker(false);
                    }}
                    className={`text-sm py-2.5 rounded-xl transition-all duration-200 font-medium ${
                      currentMonth === index + 1
                        ? "gradient-primary text-white shadow-glow"
                        : "text-surface-300 hover:bg-surface-800 hover:text-white"
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
