import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-LU", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("fr-LU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string | number) {
  return new Intl.DateTimeFormat("fr-LU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateId() {
  return crypto.randomUUID();
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  pickup_scheduled: "Recolha Agendada",
  picked_up: "Recolhido",
  washing: "Em Lavagem",
  ready: "Pronto",
  delivery_scheduled: "Entrega Agendada",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  pickup_scheduled: "bg-purple-100 text-purple-800",
  picked_up: "bg-indigo-100 text-indigo-800",
  washing: "bg-cyan-100 text-cyan-800",
  ready: "bg-green-100 text-green-800",
  delivery_scheduled: "bg-orange-100 text-orange-800",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-red-100 text-red-800",
};
