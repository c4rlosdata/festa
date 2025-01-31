// components/ui/select.tsx
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      {...props}
    >
      {children}
    </select>
  );
}

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children, ...props }: SelectItemProps) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}