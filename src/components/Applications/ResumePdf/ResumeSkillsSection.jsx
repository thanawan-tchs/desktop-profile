import ResumeDivider from './ResumeDivider'

const ResumeSkillsSection = ({ title, skills }) => {
  return (
    <>
      <ResumeDivider />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">{title}</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span key={skill} className="rounded-full bg-[#f0f0f2] px-2.5 py-1 text-[11px] text-[#444]">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

export default ResumeSkillsSection
