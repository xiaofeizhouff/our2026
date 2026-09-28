import { ReactNode } from "react";

export function QuestionPaperFrame({ children, leaving=false }: { children:ReactNode; leaving?:boolean }) {
  return <div className="question-folder">
    <div className="folder-back" aria-hidden="true"><span>OUR 2026</span><i/><i/><i/></div>
    <article className={`question-paper ${leaving?"paper-return":"paper-draw"}`}>{children}</article>
  </div>;
}
