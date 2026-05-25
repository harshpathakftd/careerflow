import { fetchApplications } from '../services/applicationService';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/common/Loader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { formatDate } from '../utils/formatDate';

const statusColor = {
  pending: 'warning',
  applied: 'brand',
  interview: 'success',
  rejected: 'danger',
  offer: 'success',
};

export default function ApplicationsPage() {
  const { data: applications, loading, error } = useFetch(fetchApplications, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
      <p className="mt-1 text-slate-600">Track your job application pipeline</p>

      <div className="mt-6 space-y-4">
        {!applications?.length ? (
          <Card>
            <p className="text-slate-600">No applications yet. Apply from the Jobs page.</p>
          </Card>
        ) : (
          applications.map((app) => (
            <Card key={app._id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{app.job?.title}</h3>
                  <p className="text-sm text-slate-600">{app.job?.company}</p>
                </div>
                <Badge color={statusColor[app.status] || 'default'}>{app.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Updated {formatDate(app.updatedAt)}
                {app.appliedAt && ` · Applied ${formatDate(app.appliedAt)}`}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
