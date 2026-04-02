import * as React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-purple-400",
        className
      )}
      {...props}
    />
  );
}