export function SingleChoiceQuestion({ options=[], value="", onChange }: { options?:string[]; value?:string; onChange:(value:string)=>void }) {
  return <div className="grid grid-cols-2 gap-3">{options.map((option,index)=><button key={option} type="button" onClick={()=>onChange(option)} className={`choice-sticker ${value===option?"choice-sticker-selected":""}`}><span aria-hidden="true" className={`choice-dot choice-dot-${index%4}`}/>{option}</button>)}</div>;
}
