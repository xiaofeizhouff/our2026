"use client";
import { ButtonHTMLAttributes } from "react";
export function Button({ className="", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`min-h-13 w-full rounded-2xl bg-[#26334d] px-5 py-3.5 text-base font-bold text-white shadow-[0_6px_0_#172238] transition active:translate-y-1 active:shadow-[0_2px_0_#172238] disabled:cursor-not-allowed disabled:opacity-40 ${className}`} {...props}>{children}</button>; }
