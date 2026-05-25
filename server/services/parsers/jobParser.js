/**
 * Parse raw job listings from scrapers / APIs into normalized Job documents.
 */

export const parseRawJob = (raw) => {
  return {
    title: raw.title?.trim() || 'Untitled',
    company: raw.company?.trim() || 'Unknown',
    location: raw.location?.trim(),
    description: raw.description,
    url: raw.url,
    source: raw.source || 'other',
    skillsRequired: extractSkills(raw.description || ''),
    postedAt: raw.postedAt ? new Date(raw.postedAt) : undefined,
  };
};

const SKILL_KEYWORDS = [
  'javascript', 'react', 'node', 'python', 'java', 'mongodb', 'aws',
  'typescript', 'express', 'docker', 'kubernetes', 'sql', 'git',
];

export const extractSkills = (text) => {
  const lower = text.toLowerCase();
  return SKILL_KEYWORDS.filter((skill) => lower.includes(skill));
};
