import { BasicInfo } from "@/types/questionnaire";

type Props = { info: BasicInfo; onChange: (info: BasicInfo) => void };

export function MemoryPackageForm({ info, onChange }: Props) {
  return <div className="package-form">
    <img src="/illustrations/profile/package.jpg" alt="手绘回忆包裹" className="package-art" />
    <div className="package-slip">
      <div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-black tracking-[.12em]">MEMORY EXPRESS</p><p className="text-[10px]">回忆快递单 · 2026</p></div><span className="border border-[#1f3155] px-1 text-[9px]">NO.2026</span></div>
      <div className="my-2 border-t border-dashed border-[#1f3155]" />
      <label>收件人 / NAME<input value={info.creatorName} onChange={e => onChange({ ...info, creatorName: e.target.value })} placeholder="写下你的名字" /></label>
      <label>寄出日期 / SINCE<input type="date" value={info.metDate} onChange={e => onChange({ ...info, metDate: e.target.value })} /></label>
      <div className="mt-2 flex justify-between border-t border-dashed border-[#1f3155] pt-2 text-[8px] leading-3"><span>PACKAGE: OUR 2026<br/>STATUS: WAITING FOR MEMORY</span><span className="barcode" aria-hidden="true">||| || |||</span></div>
    </div>
  </div>;
}
