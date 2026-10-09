"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastMethods {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
}

interface ToastContextType {
  toast: ToastMethods;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastMethods: ToastMethods = {
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
    info: (msg: string) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      {/* Toast container floating at top-right */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border text-sm font-medium backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-3 ${
              t.type === "success"
                ? "bg-slate-900/95 border-emerald-500/50 text-emerald-200 shadow-emerald-950/40"
                : t.type === "error"
                ? "bg-slate-900/95 border-rose-500/50 text-rose-200 shadow-rose-950/40"
                : "bg-slate-900/95 border-cyan-500/50 text-cyan-200 shadow-cyan-950/40"
            }`}
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            {t.type === "info" && (
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 break-words leading-relaxed">{t.message}</div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition-colors shrink-0 p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export type ToastCallable = {
  (message: string, type?: ToastType): void;
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
};

export type UseToastReturn = ToastMethods & {
  toast: ToastCallable;
  (message: string, type?: ToastType): void;
};

export function useToast(): UseToastReturn {
  const context = useContext(ToastContext);
  const baseMethods = context?.toast || {
    success: (msg: string) => console.log("[Toast Success]:", msg),
    error: (msg: string) => console.error("[Toast Error]:", msg),
    info: (msg: string) => console.info("[Toast Info]:", msg),
  };

  const callable = ((message: string, type: ToastType = "info") => {
    if (type === "success") baseMethods.success(message);
    else if (type === "error") baseMethods.error(message);
    else baseMethods.info(message);
  }) as UseToastReturn;

  callable.success = baseMethods.success;
  callable.error = baseMethods.error;
  callable.info = baseMethods.info;
  callable.toast = callable as ToastCallable;

  return callable;
}

