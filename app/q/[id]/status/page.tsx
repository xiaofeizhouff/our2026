import { StatusPage } from "@/components/StatusPage";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <StatusPage id={id}/>}
