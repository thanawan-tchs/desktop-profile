import FloatingWindow from '../FloatingWindow/FloatingWindow'
import profile from '../../data/profile.json'

const { person, resumeSkills, experience, certifications } = profile

const PdfViewerWindow = ({ onClose, zIndex, onFocus }) => {
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
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <p className="mt-0.5 text-sm text-[#555]">{person.title}</p>
          <p className="mt-2 text-xs text-[#777]">
            {person.email} &middot; {person.location}
          </p>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {resumeSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#f0f0f2] px-2.5 py-1 text-[11px] text-[#444]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              Experience
            </h2>
            {experience.map((job, index) => (
              <div key={`${job.role}-${job.company}`} className={index === 0 ? 'mt-2' : 'mt-3'}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold">{job.role}</p>
                  <p className="text-xs text-[#888]">{job.resumePeriod}</p>
                </div>
                <p className="text-xs text-[#666]">{job.company}</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
                  {job.resumeHighlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="my-4 border-[#ddd]" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              Certifications
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  {cert.name} ({cert.issued.split(' ').pop()})
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </FloatingWindow>
  )
}

export default PdfViewerWindow
