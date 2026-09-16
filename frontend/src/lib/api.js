import { useAuthStore } from '../store/useAuthStore';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function getToken() {
  try {
    const raw = localStorage.getItem('yousafzai-auth');
    const state = raw ? JSON.parse(raw)?.state : null;
    if (state?.token) return state.token;
  } catch { }
  try {
    return useAuthStore.getState().token;
  } catch { }
  return null;
}

async function request(endpoint, { method = 'GET', body, headers = {}, formData } = {}) {
  const h = { ...headers };
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers: h };

  if (formData) {
    opts.body = formData;
    delete h['Content-Type'];
  } else if (body !== undefined) {
    h['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, opts);

  if (!res.ok) {
    let msg = getSafeErrorMessage(res.status, endpoint);
    try {
      const e = await res.json();
      msg = getSafeErrorMessage(res.status, endpoint, e.error || e.message);
    } catch { }
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

function getSafeErrorMessage(status, endpoint, serverMessage = '') {
  if (status === 401 && endpoint === '/api/auth/login') return 'Email or password is incorrect.';
  if (status === 401 || status === 403) return 'Your session has expired. Please sign in again.';
  if (endpoint === '/api/upload') return 'Image upload failed. Please try again.';
  if (endpoint.startsWith('/api/cms')) return "Changes couldn't be saved. Please try again.";
  if (endpoint === '/api/auth/login') return 'Unable to sign in right now.';
  return serverMessage && !/^HTTP\s+\d+$/i.test(serverMessage)
    ? serverMessage
    : 'Something went wrong. Please try again.';
}

export const api = {
  _request: request,
  login: (email, password) =>
    request('/api/auth/login', { method: 'POST', body: { email, password } }),

  logout: () =>
    request('/api/auth/logout', { method: 'POST' }),

  getCmsAll: () =>
    request('/api/cms/all'),

  getCmsSection: (section) =>
    request(`/api/cms/${section}`),

  updateCmsSection: (section, data) =>
    request(`/api/cms/${section}`, { method: 'PUT', body: data }),

  updateCmsAll: (data) =>
    request('/api/cms/all', { method: 'PUT', body: data }),

  getStats: () =>
    request('/api/stats'),


  getJobs: () =>
    request('/api/jobs'),

  createJob: (jobData) =>
    request('/api/jobs', { method: 'POST', body: jobData }),

  updateJob: (id, jobData) =>
    request(`/api/jobs/${encodeURIComponent(id)}`, { method: 'PUT', body: jobData }),

  deleteJob: (id) =>
    request(`/api/jobs/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  getAllApplications: () =>
    request('/api/jobs/applications/all'),

  deleteApplication: (id) =>
    request(`/api/jobs/applications/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  submitQuote: (quoteData) =>
    request('/api/quotes', { method: 'POST', body: quoteData }),

  getAllQuotes: () =>
    request('/api/quotes'),

  deleteQuote: (id) =>
    request(`/api/quotes/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  uploadImage: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return request('/api/upload', { method: 'POST', formData: fd });
  },
};
