"use client";
import { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnnualData, AnswerValue, PhotoAnswer, ReportData } from "@/types/questionnaire";
import { getReport } from "@/lib/questionnaire/shared-store";
import { answersMatch, isPhotoAnswer } from "@/lib/questionnaire/answer-utils";
import { formatDrink } from "@/lib/questionnaire/date-utils";
import { CityMap } from "@/components/illustrations/CityMap";
import { DrinkCup } from "@/components/illustrations/DrinkCup";
import { WordBadges } from "@/components/questions/ThreeWordsQuestion";
import { AnnualDataCard } from "@/components/AnnualDataCard";

const text=(value:AnswerValue|undefined)=>typeof value==="string"&&value.trim()?value:"—";
const words=(value:AnswerValue|undefined)=>Array.isArray(value)?value:[];
const annual=(value:AnswerValue|undefined):AnnualData|null=>value&&typeof value==="object"&&!Array.isArray(value)&&"missYouCount" in value?value as AnnualData:null;
const photo=(value:AnswerValue|undefined):PhotoAnswer|undefined=>isPhotoAnswer(value)?value:undefined;

function Comparison({title,leftName,rightName,left,right,match}:{title:string;leftName:string;rightName:string;left:string;right:string;match:boolean}){
  return <article className="report-card"><div className="report-card-head"><h2>{title}</h2><span>{match?"想到一起了":"各有各的答案"}</span></div><div className="report-compare"><div><small>{leftName}</small><p>{left}</p></div><div><small>{rightName}</small><p>{right}</p></div></div></article>;
}

function PhotoPanel({answer,label}:{answer?:PhotoAnswer;label:string}){
  return <div><small>{label}</small>{answer?<div className="report-photo" role="img" aria-label={`${label}珍藏的照片`} style={{backgroundImage:`url("${answer.url}")`}}/>:<div className="report-photo report-photo-empty">没有上传照片</div>}</div>;
}

export function ReportPage({id}:{id:string}){
  const search=useSearchParams(),token=search.get("access")||"",[data,setData]=useState<ReportData|null>();
  useEffect(()=>{if(token)getReport(id,token).then(setData).catch(()=>setData(null));else setData(null)},[id,token]);
  if(data===undefined)return <main className="page-bg grid min-h-dvh place-items-center">正在打开共同报告…</main>;
  if(!data)return <main className="page-bg grid min-h-dvh place-items-center p-6 text-center">共同报告尚未解锁，或链接无效。</main>;
  const {questionnaire:q,answers}=data,c=answers.creator,p=answers.partner;
  const creatorCities=words(c.cities),partnerCities=words(p.cities),common=creatorCities.filter(city=>partnerCities.includes(city)),onlyCreator=creatorCities.filter(city=>!partnerCities.includes(city)),onlyPartner=partnerCities.filter(city=>!creatorCities.includes(city));
  const annualData=annual(c.annual_data)??{missYouCount:0,chatDays:0,title:"我们的年度存档"};
  return <main className="page-bg"><section className="mx-auto max-w-md px-5 py-8"><p className="text-center text-sm font-bold text-[#ff7769]">答案揭晓 · YEARLY ARCHIVE</p><h1 className="mt-2 text-center text-4xl font-black">我们的 2026</h1><div className="mt-6"><AnnualDataCard data={annualData} relationshipDate={q.relationshipDate}/></div><div className="mt-5 space-y-4">
    <article className="report-card"><div className="report-card-head"><h2>今年一起去过的地方</h2><span>{common.length?`${common.length} 个共同足迹`:"记忆各有侧重"}</span></div><CityMap selected={common}/><p className="text-center text-sm font-bold">共同记得：{common.join("、")||"暂时没有重合城市"}</p><p className="mt-3 text-xs leading-5">只有 {q.creatorName} 想起：{onlyCreator.join("、")||"—"}<br/>只有 {q.partnerName} 想起：{onlyPartner.join("、")||"—"}</p></article>
    <Comparison title="今年最常吃的东西" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.food)} right={text(p.food)} match={answersMatch(c.food,p.food)}/>
    <article className="report-card"><div className="report-card-head"><h2>我最爱喝什么</h2><span>{answersMatch(c.drink,p.drink)?"完全猜中":"答案有点不同"}</span></div><div className="grid grid-cols-2 gap-3 text-center text-sm"><div><DrinkCup small drink={(c.drink as {drink?:string})?.drink} temperature={(c.drink as {temperature?:"iced"|"hot"})?.temperature}/><b>{q.creatorName} 自己</b><p>{formatDrink(c.drink)}</p></div><div><DrinkCup small drink={(p.drink as {drink?:string})?.drink} temperature={(p.drink as {temperature?:"iced"|"hot"})?.temperature}/><b>{q.partnerName||"TA"} 眼中</b><p>{formatDrink(p.drink)}</p></div></div></article>
    <article className="report-card"><div className="report-card-head"><h2>形容今年的 TA</h2><span>三词小磁卡</span></div><div className="grid grid-cols-2 gap-3 text-center text-xs"><div><p>{q.creatorName} 的选择</p><WordBadges compact words={words(c.words)}/></div><div><p>{q.partnerName||"TA"} 的选择</p><WordBadges compact words={words(p.words)}/></div></div></article>
    <Comparison title="今年的口头禅" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.catchphrase)} right={text(p.catchphrase)} match={answersMatch(c.catchphrase,p.catchphrase)}/>
    <Comparison title="没回消息时的第一反应" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.perspective)} right={text(p.perspective)} match={answersMatch(c.perspective,p.perspective)}/>
    <article className="report-card"><div className="report-card-head"><h2>今年最想珍藏的照片</h2><span>双人相册占位</span></div><div className="report-photo-grid"><PhotoPanel answer={photo(c.photo)} label={q.creatorName}/><PhotoPanel answer={photo(p.photo)} label={q.partnerName||"TA"}/></div></article>
    <Comparison title="明年最想一起做的事" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.future_activity)} right={text(p.future_activity)} match={answersMatch(c.future_activity,p.future_activity)}/>
    <Comparison title="明年最想一起去的地方" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.future_place)} right={text(p.future_place)} match={answersMatch(c.future_place,p.future_place)}/>
    <Comparison title="写给明年的我们" leftName={q.creatorName} rightName={q.partnerName||"TA"} left={text(c.future_message)} right={text(p.future_message)} match={answersMatch(c.future_message,p.future_message)}/>
  </div></section></main>;
}
