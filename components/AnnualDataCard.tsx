import { durationFrom } from "@/lib/questionnaire/date-utils";
import { AnnualData } from "@/types/questionnaire";

export function AnnualDataCard({ data, relationshipDate, compact=false }: { data:AnnualData; relationshipDate:string; compact?:boolean }) {
  const duration=durationFrom(relationshipDate);
  return <div className={`annual-card ${compact?"annual-card-compact":""}`}>
    <p className="annual-card-kicker">OUR YEAR · 2026</p>
    <h2>{data.title}</h2>
    <div className="annual-number-grid">
      <div><b>{data.missYouCount}</b><span>次“想你”</span></div>
      <div><b>{data.chatDays}</b><span>天有聊天</span></div>
      <div><b>{duration?.days??0}</b><span>天的认识</span></div>
    </div>
    <p className="annual-year-line">这是认识的第 {duration?.years??1} 年</p>
  </div>;
}
