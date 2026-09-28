import Image from "next/image";

type AnnualCoverProps = {
  onStart: () => void;
};

export function AnnualCover({ onStart }: AnnualCoverProps) {
  return (
    <section className="annual-cover" aria-labelledby="annual-cover-title">
      <div className="annual-cover-stage">
        <Image
          className="annual-cover-people"
          src="/illustrations/cover/couple.png"
          width={1399}
          height={2353}
          sizes="(max-width: 430px) 100vw, 430px"
          preload
          alt="一对牵着手的手绘人物"
        />

        <h1 id="annual-cover-title" className="annual-cover-title">
          年度回忆档
        </h1>

        <p className="annual-cover-ours">我们的</p>

        <Image
          className="annual-cover-year"
          src="/illustrations/cover/year-2026.png"
          width={631}
          height={402}
          sizes="(max-width: 430px) 58vw, 250px"
          loading="eager"
          alt="2026"
        />

        <button className="annual-cover-button" type="button" onClick={onStart}>
          <Image
            src="/illustrations/cover/button.png"
            width={601}
            height={361}
            sizes="(max-width: 430px) 52vw, 220px"
            loading="eager"
            alt=""
          />
          <span>▷ 开始回忆</span>
        </button>
      </div>
    </section>
  );
}
