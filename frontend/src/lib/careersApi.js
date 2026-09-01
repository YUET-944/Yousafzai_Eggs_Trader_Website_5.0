import { api } from './api';

export async function getJobs() {
  const res = await api._request('/api/jobs');
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.jobs)) return res.jobs;
  return [];
}

export async function getJob(id) {
  const res = await api._request(`/api/jobs/${encodeURIComponent(id)}`);
  return res?.data ?? res?.job ?? res;
}

export async function submitApplication(jobId, fields, resumeFile) {
  const fd = new FormData();

  fd.append('fullName', fields.fullName);
  fd.append('email', fields.email);
  fd.append('phone', fields.phone);

  const optional = [
    'city',
    'education',
    'experience',
    'linkedinUrl',
    'portfolioUrl',
    'coverLetter',
  ];

  optional.forEach((key) => {
    if (fields[key] !== undefined && fields[key] !== null && String(fields[key]).trim() !== '') {
      fd.append(key, String(fields[key]).trim());
    }
  });

  if (resumeFile) {
    fd.append('resume', resumeFile);
  }

  return api._request(
    `/api/jobs/${encodeURIComponent(jobId)}/apply`,
    {
      method: 'POST',
      formData: fd,
    }
  );
}