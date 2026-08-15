import FloatingWindow from '../FloatingWindow/FloatingWindow'
import profile from '../../../data/profile.json'
import ResumeHeader from './ResumeHeader'
import ResumeSkillsSection from './ResumeSkillsSection'
import ResumeExperienceSection from './ResumeExperienceSection'
import ResumeCertificationsSection from './ResumeCertificationsSection'

const { person, resumeSectionTitles, resumeSkills, experience, certifications } = profile

const ResumePdf = ({ onClose, zIndex, onFocus }) => {
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
          <ResumeHeader person={person} />
          <ResumeSkillsSection title={resumeSectionTitles.skills} skills={resumeSkills} />
          <ResumeExperienceSection title={resumeSectionTitles.experience} jobs={experience} />
          <ResumeCertificationsSection
            title={resumeSectionTitles.certifications}
            certifications={certifications}
          />
        </div>
      </div>
    </FloatingWindow>
  )
}

export default ResumePdf
