import ResumeDivider from './ResumeDivider'

const ResumeExperienceSection = ({ title, jobs }) => {
  return (
    <>
      <ResumeDivider />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">{title}</h2>
        {jobs.map((job, index) => (
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
    </>
  )
}

export default ResumeExperienceSection
