import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [skillsText, setSkillsText] = useState((user?.skills || []).join(', '));
  const [experience, setExperience] = useState(user?.experience || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
      const { data } = await api.put('/users/profile', { name, skills, experience });
      setUser((prev) => ({ ...prev, ...data }));
      setMessage('Profile updated');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      <p className="mt-1 text-slate-600">Skills drive job match scores</p>

      <Card className="mt-6 max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label="Skills (comma separated)"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Experience</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          {message && <p className="text-sm text-brand-700">{message}</p>}
          <Button type="submit" loading={loading}>Save Profile</Button>
        </form>
      </Card>
    </div>
  );
}
