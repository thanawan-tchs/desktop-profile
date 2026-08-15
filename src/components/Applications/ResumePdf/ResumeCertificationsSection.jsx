import ResumeDivider from './ResumeDivider'

const ResumeCertificationsSection = ({ title, certifications }) => {
  return (
    <>
      <ResumeDivider />
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-[#888]">{title}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-[#333]">
          {certifications.map((cert) => (
            <li key={cert.name}>
              {cert.name} ({cert.issued.split(' ').pop()})
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default ResumeCertificationsSection
