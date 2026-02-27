"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const variantColors = {
    danger: "text-red-400 bg-red-400/10 border-red-500/20 hover:bg-red-400/20",
    warning: "text-amber-400 bg-amber-400/10 border-amber-500/20 hover:bg-amber-400/20",
    info: "text-primary-400 bg-primary-400/10 border-primary-500/20 hover:bg-primary-400/20",
  };

  const buttonColors = {
    danger: "bg-red-500 hover:bg-red-600 shadow-red-500/20",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
    info: "bg-primary-500 hover:bg-primary-600 shadow-primary-500/20",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm glass-card p-6 shadow-elevated border-surface-700/50"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 text-surface-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full mb-4 border ${variantColors[variant]}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed mb-8">
                {message}
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-surface-800 text-surface-200 text-sm font-semibold hover:bg-surface-700 transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-white text-sm font-semibold shadow-lg transition-all active:scale-95 ${buttonColors[variant]}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
