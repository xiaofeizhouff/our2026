import Image from "next/image";

type AnnualCoverProps = {
  onStart: () => void;
};

export function AnnualCover({ onStart }: AnnualCoverProps) {
  return (
    <section className="annual-cover" aria-labelledby="annual-cover-title">
      <div className="annual-cover-stage">
        <Image
          className="annual-cover-background"
          src="/illustrations/cover-v2/background.png"
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          preload
          alt=""
        />

        <Image
          className="annual-cover-confetti"
          src="/illustrations/cover-v2/confetti.png"
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          loading="eager"
          alt=""
        />

        <Image
          className="annual-cover-stars"
          src="/illustrations/cover-v2/stars.png"
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          loading="eager"
          alt=""
        />

        <h1 id="annual-cover-title" className="annual-cover-title">
          <Image
            src="/illustrations/cover-v2/title.png"
            width={521}
            height={74}
            sizes="(max-width: 430px) 42vw, 180px"
            loading="eager"
            alt="我们的2026"
          />
        </h1>

        <Image
          className="annual-cover-year"
          src="/illustrations/cover-v2/year.png"
          width={1054}
          height={651}
          sizes="(max-width: 430px) 81vw, 348px"
          loading="eager"
          alt="2026"
        />

        <Image
          className="annual-cover-subtitle"
          src="/illustrations/cover-v2/subtitle.png"
          width={377}
          height={142}
          sizes="(max-width: 430px) 34vw, 146px"
          loading="eager"
          alt="年度报告"
        />

        <button className="annual-cover-button" type="button" onClick={onStart} aria-label="开始回忆">
          <Image
            className="annual-cover-button-base"
            src="/illustrations/cover-v2/button.png"
            width={359}
            height={142}
            sizes="(max-width: 430px) 32vw, 138px"
            loading="eager"
            alt=""
          />
          <Image
            className="annual-cover-button-label"
            src="/illustrations/cover-v2/button-label.png"
            width={294}
            height={74}
            sizes="(max-width: 430px) 27vw, 116px"
            loading="eager"
            alt=""
          />
        </button>
      </div>
    </section>
  );
}
