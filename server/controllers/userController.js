import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, skills, experience, preferredRoles } = req.body;
  if (name) user.name = name;
  if (skills) user.skills = skills;
  if (experience !== undefined) user.experience = experience;
  if (preferredRoles) user.preferredRoles = preferredRoles;

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    skills: updated.skills,
    experience: updated.experience,
    preferredRoles: updated.preferredRoles,
  });
};
