import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "我们的 2026", description: "情侣年度互动问卷" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><head><link rel="preload" as="image" href="/illustrations/profile/package-cropped.png" type="image/png" fetchPriority="high" /><link rel="preload" as="image" href="/illustrations/profile/message-bubble-cropped.png" type="image/png" fetchPriority="high" /></head><body>{children}</body></html>; }
