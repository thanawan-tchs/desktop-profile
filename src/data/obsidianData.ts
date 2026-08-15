import profile from './profile.json'
import { README_CONTENT } from './readme'

const { person, about, skillGroups, experience, certifications, languages } = profile

const renderExperienceMarkdown = (jobs) => {
  return jobs
    .map((job) => {
      const parts = [`# ${job.role} — ${job.company}`, `**${job.period}**`]
      if (job.summary) parts.push(job.summary)
      if (job.highlights) parts.push(job.highlights.map((line) => `- ${line}`).join('\n'))
      if (job.projects) {
        job.projects.forEach((project) => {
          parts.push(`## ${project.name}`, `**${project.period}**`)
          parts.push(project.highlights.map((line) => `- ${line}`).join('\n'))
        })
      }
      return parts.join('\n\n')
    })
    .join('\n\n')
}

export const VAULT = [
  {
    id: 'welcome',
    label: 'Welcome',
    children: [
      {
        id: 'welcome-readme',
        label: 'README',
        content: README_CONTENT,
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    children: [
      {
        id: 'about-me',
        label: 'About Me',
        content: `# ${person.name} / ${person.nickname}\n\n${about}`,
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    children: [
      {
        id: 'skills-overview',
        label: 'Skills',
        content: `## Skills\n\n${skillGroups
          .map((group) => `**${group.category}:** ${group.items.join(', ')}`)
          .join('\n\n')}`,
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    children: [
      {
        id: 'experience-all',
        label: 'Experience',
        content: renderExperienceMarkdown(experience),
      },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications & Languages',
    children: [
      {
        id: 'cert-list',
        label: 'Certifications',
        content: `## Certifications\n\n${certifications
          .map((cert) => `- [${cert.name} (Issued ${cert.issued})](${cert.url})`)
          .join('\n')}`,
      },
      {
        id: 'lang-list',
        label: 'Languages',
        content: `## Languages\n\n${languages.map((lang) => `- ${lang}`).join('\n')}`,
      },
    ],
  },
]
