import { supabase } from "@/lib/supabase/client";
import { ParticipantRole, PhotoAnswer } from "@/types/questionnaire";

const PHOTO_BUCKET="questionnaire-photos";

export async function uploadQuestionPhoto(file: File, role: ParticipantRole): Promise<PhotoAnswer> {
  if (!file.type.startsWith("image/")) throw new Error("请选择图片文件。");
  if (file.size > 5*1024*1024) throw new Error("图片不能超过 5MB。");
  const extension=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";
  const path=`uploads/${role}/${crypto.randomUUID()}.${extension}`;
  const {error}=await supabase.storage.from(PHOTO_BUCKET).upload(path,file,{contentType:file.type,upsert:false});
  if (error) throw new Error(`图片上传失败：${error.message}`);
  const {data}=supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new Error("图片上传成功，但没有获得可访问地址。");
  return {kind:"photo",url:data.publicUrl,path,fileName:file.name};
}
