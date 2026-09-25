import { BasicInfo } from "@/types/questionnaire";

type Props = { info: BasicInfo; onChange: (info: BasicInfo) => void };

export function MemoryPackageForm({ info, onChange }: Props) {
  return <div className="package-form">
    <img src="/illustrations/profile/package-cropped.png" alt="手绘回忆包裹" className="package-art" />
    <p className="package-logo">MEMORY EXPRESS</p>
    <div className="package-slip">
      <p className="shipping-subtitle">回忆快递单 · 2026</p>
      <div className="my-2 border-t border-dashed border-[#1f3155]" />
      <label>收件人 / NAME<input value={info.creatorName} onChange={e => onChange({ ...info, creatorName: e.target.value })} placeholder="写下你的名字" /></label>
      <label>寄出日期 / SINCE<input type="date" value={info.metDate} onChange={e => onChange({ ...info, metDate: e.target.value })} /></label>
      <div className="shipping-footer"><span>PACKAGE: OUR 2026<br/>STATUS: WAITING FOR MEMORY</span><span className="barcode" aria-hidden="true">||| || |||</span></div>
    </div>
  </div>;
}
