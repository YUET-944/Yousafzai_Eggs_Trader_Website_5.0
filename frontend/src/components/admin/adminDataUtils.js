export function unwrapData(res) {
  return res?.data ?? res;
}

export function toArray(res) {
  const data = unwrapData(res);
  if (Array.isArray(data)) return data;
  if (Array.isArray(res?.jobs)) return res.jobs;
  if (Array.isArray(res?.applications)) return res.applications;
  if (Array.isArray(res)) return res;
  return [];
}

export function formatDate(value) {
  if (!value) return 'Not provided';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getJobTitle(application) {
  return application?.Job?.title || application?.job?.title || application?.jobTitle || `Job #${application?.jobId || 'Unknown'}`;
}

export function getJobMeta(application) {
  const job = application?.Job || application?.job;
  return [job?.department, job?.location].filter(Boolean).join(' / ');
}

export function isUsableUrl(value) {
  return typeof value === 'string' && (/^https?:\/\//i.test(value) || value.startsWith('/'));
}