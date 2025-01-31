// components/ui/card.tsx
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, ...props }: CardProps) {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ children, ...props }: CardHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-4" {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ children, ...props }: CardTitleProps) {
  return (
    <h3 className="text-xl font-semibold" {...props}>
      {children}
    </h3>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ children, ...props }: CardContentProps) {
  return <div className="pt-4" {...props}>{children}</div>;
}