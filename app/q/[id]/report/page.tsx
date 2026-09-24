import { ReportPage } from "@/components/ReportPage";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <ReportPage id={id}/>}
