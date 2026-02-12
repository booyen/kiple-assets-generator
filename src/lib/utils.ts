import { type ClassValue, clsx } from 'clsx';

// Simple class name merger (lightweight alternative to clsx + tailwind-merge)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Generate lighter/darker shades
export function adjustColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) => Math.min(255, Math.max(0, value + amount));

  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

// Format currency
export function formatCurrency(amount: string, symbol: string): string {
  return `${symbol}${amount}`;
}

// Mask balance
export function maskBalance(amount: string): string {
  return '*'.repeat(amount.replace(/[^0-9]/g, '').length);
}

// Generate screen filename
export function generateFilename(screenId: string, format: 'png' | 'jpeg'): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${screenId}-${timestamp}.${format}`;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
