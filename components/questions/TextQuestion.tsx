export function TextQuestion({ value="", onChange, multiline=false, placeholder="写下你的答案", maxLength=160 }: { value?:string; onChange:(value:string)=>void; multiline?:boolean; placeholder?:string; maxLength?:number }) {
  const classes="question-text-input";
  return <div>
    {multiline?<textarea className={classes} rows={5} value={value} maxLength={maxLength} placeholder={placeholder} onChange={event=>onChange(event.target.value)}/>:<input className={classes} value={value} maxLength={maxLength} placeholder={placeholder} onChange={event=>onChange(event.target.value)}/>} 
    <p className="mt-2 text-right text-xs text-slate-500">{value.length}/{maxLength}</p>
  </div>;
}
