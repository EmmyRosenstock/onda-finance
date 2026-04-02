import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-purple-400",
  {
    variants: {
      variant: {
        primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
        ghost: "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-11 px-4 py-2",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);