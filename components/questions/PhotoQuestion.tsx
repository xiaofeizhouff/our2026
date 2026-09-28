"use client";
import { useState } from "react";
import { uploadQuestionPhoto } from "@/lib/questionnaire/photo-storage";
import { ParticipantRole, PhotoAnswer } from "@/types/questionnaire";

export function PhotoQuestion({ value, role, onChange }: { value?:PhotoAnswer; role:ParticipantRole; onChange:(value:PhotoAnswer)=>void }) {
  const [uploading,setUploading]=useState(false),[error,setError]=useState("");
  const upload=async(file?:File)=>{if(!file)return;setUploading(true);setError("");try{onChange(await uploadQuestionPhoto(file,role))}catch(reason){setError(reason instanceof Error?reason.message:"图片上传失败，请重试。")}finally{setUploading(false)}};
  return <div className="photo-question">
    {value?<div className="photo-preview">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value.url} alt="今年想珍藏的照片"/>
      <span>已装入年度档案</span>
    </div>:<div className="photo-placeholder" aria-hidden="true"><span/><span/><span/><b>PHOTO</b></div>}
    <label className="photo-upload-button">{uploading?"正在上传…":value?"重新选择照片":"选择一张照片"}<input type="file" accept="image/*" disabled={uploading} onChange={event=>upload(event.target.files?.[0])}/></label>
    <p className="mt-2 text-center text-xs text-slate-500">支持常见图片格式，最大 5MB</p>
    {error&&<p className="mt-2 text-center text-sm text-red-600">{error}</p>}
  </div>;
}
