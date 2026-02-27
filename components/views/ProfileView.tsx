"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LogOut, Receipt, TrendingUp, Calendar, Shield } from "lucide-react";
import { Session } from "next-auth";

interface ProfileViewProps {
  session: Session;
  stats: { total: number; count: number; months: number };
  onSignOut: () => void;
}

export default function ProfileView({ session, stats, onSignOut }: ProfileViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 pb-28 lg:pb-8 space-y-6 pt-6"
    >
      {/* Profile card */}
      <div className="glass-card p-6 sm:p-8 text-center">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary-500/50 mb-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{session.user?.name}</h2>
        <p className="text-surface-400 text-sm sm:text-base mt-1">{session.user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-card p-4 sm:p-5 text-center">
          <Receipt className="w-6 h-6 text-primary-400 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-bold text-white">{stats.count}</p>
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">Transactions</p>
        </div>
        <div className="glass-card p-4 sm:p-5 text-center">
          <TrendingUp className="w-6 h-6 text-accent-400 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-bold text-white">₹{(stats.total / 1000).toFixed(1)}k</p>
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">Spent</p>
        </div>
        <div className="glass-card p-4 sm:p-5 text-center">
          <Calendar className="w-6 h-6 text-violet-400 mx-auto mb-2" />
          <p className="text-lg sm:text-xl font-bold text-white">{stats.months}</p>
          <p className="text-[10px] sm:text-xs text-surface-400 uppercase tracking-wider">Months</p>
        </div>
      </div>

      <div className="glass-card p-5 space-y-3">
        <div className="flex items-center gap-3 text-surface-300">
          <Shield className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm sm:text-base font-medium">Secure & Private</p>
            <p className="text-xs sm:text-sm text-surface-500">Your data is encrypted and only accessible by you</p>
          </div>
        </div>
      </div>

      <button
        onClick={onSignOut}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-500/30 text-red-400 font-medium text-base hover:bg-red-500/10 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>

      <p className="text-center text-surface-600 text-xs">
        My Expenses v1.0.0
      </p>
    </motion.div>
  );
}
