"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <img
        src="/logo.png"
        alt="Logo"
        width="80"
        height="60"
        className="object-contain"
      />
      <p className={cn("text-xl font-semibold text-white", font.className)}>
        {label}
      </p>
    </div>
  );
};
