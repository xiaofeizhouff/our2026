import { AnnualData } from "@/types/questionnaire";

export function getAnnualTitle(missYouCount: number, chatDays: number) {
  if (missYouCount >= 365 && chatDays >= 300) return "全年热恋通讯员";
  if (chatDays >= 300) return "日常分享合伙人";
  if (missYouCount >= 100) return "想你信号发射站";
  if (chatDays >= 180) return "生活同步记录员";
  return "细水长流收藏家";
}

export function makeAnnualData(missYouCount: number, chatDays: number): AnnualData {
  return { missYouCount, chatDays, title:getAnnualTitle(missYouCount,chatDays) };
}
