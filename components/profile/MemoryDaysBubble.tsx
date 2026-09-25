import Image from "next/image";

export function MemoryDaysBubble({ days, years }: { days: number; years: number }) {
  return <div className="days-bubble"><Image src="/illustrations/profile/message-bubble-cropped.png" alt="手绘绿色对话框" width={863} height={343} sizes="(max-width: 430px) 81vw, 343px" preload unoptimized /><p>原来我们已经认识 <b>{days}</b> 天了。<br/>这是我们认识的第 {years} 年。</p></div>;
}
