// components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      {...props}
    >
      {children}
    </button>
  );
}