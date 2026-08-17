// Frontend-only API boundary for Careers.
// Replace with real backend integration when endpoints are available.

export const getJobs = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return [];
};

export const getJob = async (slug) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return null;
};

export const submitApplication = async (jobId, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  throw new Error(`Application submission is not connected yet. Backend endpoint is required for jobId: ${jobId}`);
};
