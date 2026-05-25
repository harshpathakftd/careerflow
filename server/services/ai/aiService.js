/**
 * AI service layer — wire OpenAI, Claude, or Bedrock here.
 * Returns placeholder content when no API key is configured.
 */

const hasOpenAI = () => Boolean(process.env.OPENAI_API_KEY);

export const optimizeResume = async ({ targetJobTitle, jobDescription }) => {
  if (!hasOpenAI()) {
    return {
      content: `[ATS Optimized Resume for ${targetJobTitle || 'Role'}]\n\nTailored summary and bullet points based on job description.\n\n${jobDescription?.slice(0, 200) || ''}...`,
      atsScore: 78,
    };
  }

  // TODO: integrate OpenAI / Claude / Bedrock
  return {
    content: 'AI-optimized resume content',
    atsScore: 85,
  };
};

export const generateCoverLetter = async ({
  userName,
  skills,
  jobTitle,
  company,
  jobDescription,
}) => {
  if (!hasOpenAI()) {
    return `Dear Hiring Manager at ${company || 'the company'},\n\nI am ${userName}, excited to apply for the ${jobTitle} position. My skills include ${(skills || []).join(', ') || 'relevant expertise'}.\n\n${jobDescription ? 'I align with your requirements and would welcome a conversation.' : ''}\n\nSincerely,\n${userName}`;
  }

  return 'AI-generated cover letter';
};

export const parseJobDescription = async (description) => {
  if (!hasOpenAI()) {
    return { skills: [], summary: description?.slice(0, 300) };
  }
  return { skills: [], summary: '' };
};
