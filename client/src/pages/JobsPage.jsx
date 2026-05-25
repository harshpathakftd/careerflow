import { useState } from 'react';
import { fetchJobs, applyToJob } from '../services/jobService';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/common/Loader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export default function JobsPage() {
  const { data: jobs, loading, error } = useFetch(fetchJobs, []);
  const [applyingId, setApplyingId] = useState(null);
  const [message, setMessage] = useState('');

  const handleApply = async (jobId) => {
    setApplyingId(jobId);
    setMessage('');
    try {
      await applyToJob(jobId);
      setMessage('Application queued for automation');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Apply failed');
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Jobs</h1>
      <p className="mt-1 text-slate-600">Sorted by skill match score</p>
      {message && <p className="mt-4 text-sm text-brand-700">{message}</p>}

      <div className="mt-6 space-y-4">
        {!jobs?.length ? (
          <Card>
            <p className="text-slate-600">No jobs yet. Add jobs via API or job scraper.</p>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job._id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-slate-600">{job.company} · {job.location || 'Remote'}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge color="brand">{job.matchScore}% match</Badge>
                    {job.source && <Badge>{job.source}</Badge>}
                  </div>
                </div>
                <Button
                  loading={applyingId === job._id}
                  onClick={() => handleApply(job._id)}
                >
                  Auto Apply
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
