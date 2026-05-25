import api from './api';

export const fetchJobs = () => api.get('/jobs');
export const fetchJobById = (id) => api.get(`/jobs/${id}`);
export const applyToJob = (jobId) => api.post(`/applications/apply/${jobId}`);
