"use client";
import { useEffect,useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { AnswerValue,SharedQuestionnaire } from "@/types/questionnaire";
import { coupleQuestions } from "@/data/couple-2026";
import { getInvite,submitPartner } from "@/lib/questionnaire/shared-store";
import { isAnswerComplete } from "@/lib/questionnaire/answer-utils";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { AnnualDataCard } from "@/components/AnnualDataCard";
import { QuestionPaperFrame } from "@/components/QuestionPaperFrame";

export function SharedQuestionnairePage({id}:{id:string}){
  const search=useSearchParams(),router=useRouter(),token=search.get("invite")||"";
  const [questionnaire,setQuestionnaire]=useState<SharedQuestionnaire|null>(),[name,setName]=useState(""),[started,setStarted]=useState(false);
  const [answers,setAnswers]=useState<Record<string,AnswerValue>>({}),[index,setIndex]=useState(0),[leaving,setLeaving]=useState(false),[submitting,setSubmitting]=useState(false),[error,setError]=useState("");
  useEffect(()=>{if(token)getInvite(id,token).then(setQuestionnaire).catch(reason=>setError(reason.message));else setQuestionnaire(null)},[id,token]);
  if(questionnaire===undefined)return <main className="page-bg grid min-h-dvh place-items-center">正在打开邀请…</main>;
  if(!questionnaire||!token)return <main className="page-bg grid min-h-dvh place-items-center p-6 text-center">这个邀请链接无效或已失效。{error&&<span className="mt-2 block text-sm">{error}</span>}</main>;
  const question=coupleQuestions[index];
  const moveTo=(next:number)=>{if(leaving)return;setLeaving(true);window.setTimeout(()=>{setIndex(next);setLeaving(false)},180)};
  const submit=async()=>{
    if(index<coupleQuestions.length-1){moveTo(index+1);return}
    setSubmitting(true);setError("");
    try{await submitPartner(id,token,name,answers);router.push(`/q/${id}/report?access=${token}`)}
    catch(reason){setError(reason instanceof Error?reason.message:"提交失败，请重试。");setSubmitting(false)}
  };
  return <main className="page-bg"><div className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-6">{!started?<section className="my-auto text-center"><div className="text-6xl">💌</div><p className="mt-6 text-sm font-bold text-[#ff7769]">一封年度邀请</p><h1 className="mt-2 text-3xl font-black">{questionnaire.creatorName} 邀请你一起完成《我们的 2026》</h1><p className="mt-4 leading-7 text-slate-600">TA 已经回答完了。你不需要重新填写年度数字，完成问卷后就会一起解锁共同报告。</p>{questionnaire.annualData&&<div className="mt-6 text-left"><AnnualDataCard compact data={questionnaire.annualData} relationshipDate={questionnaire.relationshipDate}/></div>}<label className="mt-7 block text-left text-sm font-bold">你的名字<input value={name} onChange={event=>setName(event.target.value)} placeholder="怎么称呼你？" className="mt-2 min-h-12 w-full rounded-xl border-2 border-white bg-white px-3 outline-none"/></label><div className="mt-6"><Button disabled={!name.trim()} onClick={()=>setStarted(true)}>开始回答 10 道题</Button></div></section>:<section className="my-auto"><QuestionPaperFrame leaving={leaving}><p className="text-xs font-black tracking-[.14em] text-[#e75c5c]">QUESTION {String(index+1).padStart(2,"0")}</p><div className="mt-3"><Progress current={index+1} total={coupleQuestions.length}/></div><h1 className="mt-6 text-2xl font-black">{question.partnerPrompt}</h1><p className="mt-2 text-sm text-slate-500">{question.helper}</p><div className="mt-6"><QuestionRenderer role="partner" question={question} value={answers[question.id]} onChange={value=>setAnswers({...answers,[question.id]:value})}/></div>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-7"><Button disabled={!isAnswerComplete(question,answers[question.id])||leaving||submitting} onClick={submit}>{submitting?"正在合并答案…":index===coupleQuestions.length-1?"提交并解锁报告":"收好这张，下一题"}</Button>{index>0&&<button className="mt-5 w-full text-sm underline" disabled={leaving} onClick={()=>moveTo(index-1)}>上一题</button>}</div></QuestionPaperFrame></section>}</div></main>;
}
