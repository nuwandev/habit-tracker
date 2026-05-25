import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return <button className="bg-violet-600 hover:bg-violet-500 transition-colors rounded px-2 disabled:opacity-30 disabled:cursor-not-allowed">{children}</button>;
};
