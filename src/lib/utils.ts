import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number with Arabic locale
 */
export function formatNumber(num: number, locale: string = 'ar-SY'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format currency for Syrian Pound
 */
export function formatSYP(amount: number): string {
  return `${formatNumber(amount)} ل.س`
}

/**
 * Format currency for USD
 */
export function formatUSD(amount: number): string {
  return `$${formatNumber(amount, 'en-US')}`
}
