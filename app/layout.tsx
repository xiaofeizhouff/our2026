import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "我们的 2026", description: "情侣年度互动问卷" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
