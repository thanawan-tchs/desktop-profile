import FloatingWindow from '../FloatingWindow/FloatingWindow'

function PdfViewerWindow({ onClose, zIndex, onFocus }) {
  return (
    <FloatingWindow
      title="Resume.pdf"
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
      widthRatio={0.36}
      heightRatio={0.78}
      horizontalBias={0.9}
      verticalBias={1.4}
      minWidth={360}
      minHeight={420}
    >
      <div className="flex-1 overflow-y-auto bg-[#525258] px-6 py-8">
        <div className="mx-auto w-full max-w-md rounded-sm bg-white px-10 py-10 text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <h1 className="text-2xl font-bold">Thanawan Techasai</h1>
          <p className="mt-0.5 text-sm text-[#555]">Full Stack Software Engineer</p>
          <p className="mt-2 text-xs text-[#777]">thanawan.tchs@gmail.com &middot; Bangkok, TH</p>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              Experience
            </h2>
            <div className="mt-2">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">Software Engineer (Full Stack)</p>
                <p className="text-xs text-[#888]">2021 — Present</p>
              </div>
              <p className="text-xs text-[#666]">Palo IT, Thailand</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
                <li>
                  Delivered web, mobile, and backend solutions for enterprise clients including
                  The 1 Central, AIA Hong Kong, and True Corporation
                </li>
                <li>Led a team of 6 engineers building a React Native insurance claims feature</li>
                <li>
                  Built secure customer data services with Node.js, DynamoDB, and AWS KMS
                </li>
              </ul>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">Software Engineer (Golang)</p>
                <p className="text-xs text-[#888]">2020 — 2021</p>
              </div>
              <p className="text-xs text-[#666]">T.N. Incorporation</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
                <li>
                  Built core loan management microservices in Go for Kasikorn Bank and the
                  Government Savings Bank
                </li>
              </ul>
            </div>
          </section>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              Certifications
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
              <li>GitHub Actions (2024)</li>
              <li>Certified Kubernetes Application Developer — CKAD (2022)</li>
            </ul>
          </section>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                'JavaScript/TypeScript',
                'Go',
                'React',
                'Vue.js',
                'React Native',
                'Node.js',
                'Spring Boot',
                'DynamoDB/Postgres',
                'Docker/Kubernetes',
                'Kafka',
                'CI/CD',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#f0f0f2] px-2.5 py-1 text-[11px] text-[#444]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </FloatingWindow>
  )
}

export default PdfViewerWindow
