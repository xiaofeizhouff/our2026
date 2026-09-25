export function MemoryDaysBubble({ days, years }: { days: number; years: number }) {
  return <div className="days-bubble"><img src="/illustrations/profile/message-bubble.jpg" alt="手绘绿色对话框" /><p>原来我们已经认识 <b>{days}</b> 天了。<br/>这是我们认识的第 {years} 年。</p></div>;
}
