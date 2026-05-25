import api from './api';

export const fetchApplications = () => api.get('/applications');
