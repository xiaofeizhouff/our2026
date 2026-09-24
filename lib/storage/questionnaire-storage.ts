import { AppData } from "@/types/questionnaire";
const KEY = "our-2026-questionnaire-v01";
export const initialData: AppData = { step:"home", activeRole:"creator", basicInfo:{creatorName:"",metDate:"",relationshipDate:""}, answers:{creator:{},partner:{}} };
export const questionnaireStorage = { load: (): AppData => { if (typeof window === "undefined") return initialData; try { const raw=localStorage.getItem(KEY); return raw ? { ...initialData, ...JSON.parse(raw) } : initialData; } catch { return initialData; } }, save: (data: AppData) => { if (typeof window !== "undefined") localStorage.setItem(KEY,JSON.stringify(data)); }, clear: () => { if (typeof window !== "undefined") localStorage.removeItem(KEY); } };
