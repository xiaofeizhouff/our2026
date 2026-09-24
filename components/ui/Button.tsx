"use client";
import { ButtonHTMLAttributes } from "react";
export function Button({ className="", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`min-h-13 w-full rounded-lg border-[3px] border-[#1f3155] bg-[#e75c5c] px-5 py-3 text-base font-black text-[#fff9e8] shadow-[4px_4px_0_#1f3155] transition active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 ${className}`} {...props}><span className="mr-2 text-xs">▶</span>{children}</button>; }
