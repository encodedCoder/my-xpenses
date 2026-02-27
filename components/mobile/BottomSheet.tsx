"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Mobile: bottom sheet | Desktop: centered modal */}
          {/* Mobile bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-hidden lg:hidden"
          >
            <div className="bg-surface-900 rounded-t-3xl border-t border-surface-700/50 max-h-[90vh] flex flex-col">
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-surface-600" />
              </div>
              <div className="flex items-center justify-between px-5 pb-3">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-800 flex items-center justify-center hover:bg-surface-700 transition-colors"
                >
                  <X className="w-4 h-4 text-surface-400" />
                </button>
              </div>
              <div className="overflow-y-auto px-5 pb-10 safe-bottom">
                {children}
              </div>
            </div>
          </motion.div>

          {/* Desktop: centered modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:flex fixed inset-0 z-50 items-center justify-center p-8"
          >
            <div className="bg-surface-900 rounded-2xl border border-surface-700/50 shadow-elevated w-full max-w-lg max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-surface-800/50">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-800 flex items-center justify-center hover:bg-surface-700 transition-colors"
                >
                  <X className="w-4 h-4 text-surface-400" />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
