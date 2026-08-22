import { api } from './api';

export async function getJobs() {
  const res = await api._request('/api/careers');

  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.jobs)) return res.jobs;
  if (Array.isArray(res?.data)) return res.data;

  return [];
}

export async function getJob(slug) {
  const res = await api._request(
    `/api/careers/${encodeURIComponent(slug)}`
  );

  return res?.job ?? res?.data ?? res;
}

export async function submitApplication(jobId, fields, resumeFile) {
  const fd = new FormData();

  fd.append('jobId', jobId);
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
    if (fields[key]) {
      fd.append(key, fields[key]);
    }
  });

  if (resumeFile) {
    fd.append('resume', resumeFile);
  }

  return api._request('/api/careers/apply', {
    method: 'POST',
    formData: fd,
  });
}