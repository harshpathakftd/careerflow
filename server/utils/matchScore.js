export const calculateMatchScore = (userSkills = [], jobSkills = []) => {
  if (!jobSkills.length) return 0;
  const userSet = new Set(userSkills.map((s) => s.toLowerCase().trim()));
  const matched = jobSkills.filter((s) => userSet.has(s.toLowerCase().trim()));
  return Math.round((matched.length / jobSkills.length) * 100);
};
