import React, { useState } from 'react';
import { Button } from '../ui/button';

function getToken() {
  return localStorage.getItem('token');
}

interface OnboardingPageProps {
  onNavigate: (page: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    bio: '',
    website: '',
    linkedin: '',
    techSkills: '',
    softSkills: '',
    experience: '',
    education: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          location: form.location,
          website: form.website,
          linkedin: form.linkedin,
          bio: form.bio,
          skills: [
            ...form.techSkills.split(',').map(s => s.trim()).filter(Boolean),
            ...form.softSkills.split(',').map(s => s.trim()).filter(Boolean)
          ],
          techSkills: form.techSkills.split(',').map(s => s.trim()).filter(Boolean),
          softSkills: form.softSkills.split(',').map(s => s.trim()).filter(Boolean),
          experience: form.experience,
          education: form.education
        })
      });
      if (!res.ok) throw new Error('Failed to save profile');
      // Fetch latest user profile from backend
      const profileRes = await fetch('/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!profileRes.ok) throw new Error('Failed to fetch profile');
      const { user } = await profileRes.json();
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false);
      onNavigate('dashboard');
    } catch (err) {
      setLoading(false);
      alert('Error saving profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-900/60 to-yellow-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 border-2 border-yellow-400 rounded-2xl shadow-[0_0_40px_10px_rgba(255,255,0,0.15)] p-8 w-full max-w-2xl space-y-8 text-yellow-100"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <h2 className="text-3xl font-extrabold text-yellow-300 mb-2 text-center drop-shadow-[0_0_8px_#fde047] tracking-wide">
          Complete Your Profile
        </h2>
        <p className="text-yellow-200/80 text-center mb-6 text-lg">
          Fill in all details to unlock resume AI features and get the best job matches!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Website</label>
            <input name="website" value={form.website} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. johndoe.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">LinkedIn</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. linkedin.com/in/johndoe" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Technical Skills <span className="text-xs text-yellow-300">(comma separated)</span></label>
            <input name="techSkills" value={form.techSkills} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. React, Node.js, Python" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Soft Skills <span className="text-xs text-yellow-300">(comma separated)</span></label>
            <input name="softSkills" value={form.softSkills} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. Communication, Leadership" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-yellow-200">Bio / About You</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" rows={3} placeholder="Tell us about yourself, your goals, and what makes you unique." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Experience <span className="text-xs text-yellow-300">(e.g. 3 years in Frontend, 1 year in Backend)</span></label>
            <input name="experience" value={form.experience} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. 3 years in Frontend, 1 year in Backend" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-yellow-200">Education <span className="text-xs text-yellow-300">(e.g. B.Tech CSE, 2022, IIT Delhi)</span></label>
            <input name="education" value={form.education} onChange={handleChange} className="input bg-black/60 border-yellow-400 text-yellow-100" placeholder="e.g. B.Tech CSE, 2022, IIT Delhi" />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 text-lg font-bold bg-yellow-400 text-black hover:bg-yellow-300 transition" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Continue'}
        </Button>
      </form>
    </div>
  );
};


