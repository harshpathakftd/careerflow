import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Welcome back, {user?.name}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card title="Matched Jobs">
          <p className="text-3xl font-bold text-brand-600">—</p>
          <p className="mt-1 text-sm text-slate-500">Based on your skills</p>
          <Link to="/jobs" className="mt-4 inline-block">
            <Button variant="ghost">Browse Jobs</Button>
          </Link>
        </Card>
        <Card title="Applications">
          <p className="text-3xl font-bold text-brand-600">—</p>
          <p className="mt-1 text-sm text-slate-500">Track your pipeline</p>
          <Link to="/applications" className="mt-4 inline-block">
            <Button variant="ghost">View All</Button>
          </Link>
        </Card>
        <Card title="Resume">
          <p className="text-sm text-slate-600">Upload and optimize with AI</p>
          <Link to="/profile" className="mt-4 inline-block">
            <Button variant="ghost">Manage Profile</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
