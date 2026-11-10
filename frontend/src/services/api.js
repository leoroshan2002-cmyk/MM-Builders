// All communication with the Express backend lives here.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, { method = 'GET', body, timeout = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(json.message || `Request failed (${res.status})`);
      error.details = json.details;
      throw error;
    }
    return json;
  } finally {
    clearTimeout(timer);
  }
}

/** Services, concepts, blueprints and contact details in one call. */
export const fetchSiteContent = async () => (await request('/api/site')).data;

/** Saves an enquiry in MongoDB. */
export const sendEnquiry = (payload) => request('/api/enquiries', { method: 'POST', body: payload });
