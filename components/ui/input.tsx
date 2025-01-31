// components/ui/input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export function Input({ children, ...props }: InputProps) {
  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    >
      {children}
    </input>
  );
}