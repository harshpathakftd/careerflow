import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const features = [
  { title: 'Auto Job Discovery', desc: 'Find roles that match your skills automatically.' },
  { title: 'AI Resume Optimization', desc: 'ATS-friendly resumes tailored per job.' },
  { title: 'Cover Letters', desc: 'AI-generated cover letters in seconds.' },
  { title: 'Auto Apply', desc: 'Playwright-powered application automation.' },
  { title: 'Track Applications', desc: 'Monitor status from pending to offer.' },
  { title: 'Notifications', desc: 'Stay updated on matches and applications.' },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-xl font-bold text-brand-700">CareerFlow</span>
          <div className="flex gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          AI Job Apply Automation Platform
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Find jobs, optimize resumes, generate cover letters, and apply automatically — all in one place.
        </p>
        {!user && (
          <Link to="/register" className="mt-8 inline-block">
            <Button className="px-8 py-3 text-base">Start Free</Button>
          </Link>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
