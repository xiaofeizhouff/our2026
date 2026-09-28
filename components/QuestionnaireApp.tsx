"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnswerValue, AnnualData, BasicInfo } from "@/types/questionnaire";
import { coupleQuestions } from "@/data/couple-2026";
import { createSharedQuestionnaire } from "@/lib/questionnaire/shared-store";
import { makeAnnualData } from "@/lib/questionnaire/annual-data";
import { isAnswerComplete } from "@/lib/questionnaire/answer-utils";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { MemoryPackageForm } from "@/components/profile/MemoryPackageForm";
import { AnnualDataCard } from "@/components/AnnualDataCard";
import { QuestionPaperFrame } from "@/components/QuestionPaperFrame";
import { AnnualCover } from "@/components/AnnualCover";

function Shell({children,cover=false}:{children:React.ReactNode;cover?:boolean}){return <main className={cover?"annual-cover-page":"page-bg relative"}>{!cover&&<><i className="float absolute left-4 top-16 h-18 w-18 rounded-full bg-[#ffb5a6]/50"/><i className="float-slow absolute right-3 top-42 h-24 w-24 rounded-[30px] bg-[#abcff8]/40"/></>}<div className={cover?"annual-cover-shell":"relative mx-auto flex min-h-dvh max-w-md flex-col px-5 py-6"}>{children}</div></main>}

export function QuestionnaireApp(){
  const router=useRouter();
  const [step,setStep]=useState<"home"|"info"|"annual"|"questions">("home");
  const [info,setInfo]=useState<BasicInfo>({creatorName:"",metDate:"",relationshipDate:""});
  const [annualDraft,setAnnualDraft]=useState({missYouCount:"",chatDays:""});
  const [answers,setAnswers]=useState<Record<string,AnswerValue>>({});
  const [index,setIndex]=useState(0),[leaving,setLeaving]=useState(false),[saving,setSaving]=useState(false),[error,setError]=useState("");
  const question=coupleQuestions[index];
  const annualData:AnnualData=makeAnnualData(Number(annualDraft.missYouCount)||0,Number(annualDraft.chatDays)||0);
  const annualReady=annualDraft.missYouCount!==""&&annualDraft.chatDays!==""&&Number(annualDraft.chatDays)>=0&&Number(annualDraft.chatDays)<=366;
  const moveTo=(next:number)=>{if(leaving)return;setLeaving(true);window.setTimeout(()=>{setIndex(next);setLeaving(false)},180)};
  const submit=async()=>{
    if(index<coupleQuestions.length-1){moveTo(index+1);return}
    setSaving(true);setError("");
    try{const saved=await createSharedQuestionnaire(info.creatorName,info.metDate,answers,annualData);router.push(`/q/${saved.questionnaire_id}/status?access=${saved.creator_token}&invite=${saved.invite_token}`)}
    catch(reason){setError(reason instanceof Error?reason.message:"保存失败，请稍后重试。")}finally{setSaving(false)}
  };
  let content:React.ReactNode;
  if(step==="home") content=<AnnualCover onStart={()=>setStep("info")}/>;
  else if(step==="info") content=<section className="my-auto"><p className="mb-3 text-center text-sm text-slate-600">先寄出一份关于你的信息。</p><div className="profile-visual-stack"><MemoryPackageForm info={info} onChange={setInfo}/></div><div className="mt-5"><Button disabled={!info.creatorName||!info.metDate} onClick={()=>setStep("annual")}>载入年度数据</Button></div></section>;
  else if(step==="annual") content=<section className="my-auto"><p className="text-center text-xs font-black tracking-[.18em] text-[#e75c5c]">YEARLY DATA</p><h1 className="mt-2 text-center text-3xl font-black">先补上今年的两个数字</h1><div className="annual-form mt-6"><label>今年大概互相说了多少次“想你”<input inputMode="numeric" type="number" min="0" value={annualDraft.missYouCount} onChange={event=>setAnnualDraft({...annualDraft,missYouCount:event.target.value})} placeholder="例如：128"/></label><label>今年一共聊天了多少天<input inputMode="numeric" type="number" min="0" max="366" value={annualDraft.chatDays} onChange={event=>setAnnualDraft({...annualDraft,chatDays:event.target.value})} placeholder="0～366"/></label></div>{annualReady&&<div className="mt-5"><AnnualDataCard data={annualData} relationshipDate={info.metDate}/></div>}<div className="mt-6"><Button disabled={!annualReady} onClick={()=>setStep("questions")}>开始正式问卷</Button><button className="mt-4 w-full text-sm underline" onClick={()=>setStep("info")}>返回修改资料</button></div></section>;
  else content=<section className="my-auto"><QuestionPaperFrame leaving={leaving}><p className="text-xs font-black tracking-[.14em] text-[#e75c5c]">QUESTION {String(index+1).padStart(2,"0")}</p><div className="mt-3"><Progress current={index+1} total={coupleQuestions.length}/></div><h1 className="mt-6 text-2xl font-black">{question.creatorPrompt}</h1><p className="mt-2 text-sm text-slate-500">{question.helper}</p><div className="mt-6"><QuestionRenderer role="creator" question={question} value={answers[question.id]} onChange={value=>setAnswers({...answers,[question.id]:value})}/></div>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-7"><Button disabled={!isAnswerComplete(question,answers[question.id])||saving||leaving} onClick={submit}>{saving?"正在保存存档…":index===coupleQuestions.length-1?"保存并生成邀请":"收好这张，下一题"}</Button>{index>0&&<button className="mt-5 w-full text-sm underline" disabled={leaving} onClick={()=>moveTo(index-1)}>上一题</button>}</div></QuestionPaperFrame></section>;
  return <Shell cover={step==="home"}>{content}</Shell>;
}
