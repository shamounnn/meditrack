const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const REQUEST_TIMEOUT = 10000; // 10 seconds

async function request(path, options = {}) {
  const token = localStorage.getItem('meditrack_token');
  const finalOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  };

  // Create a timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout - server is not responding')), REQUEST_TIMEOUT);
  });

  try {
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(`${API_BASE_URL}${path}`, finalOptions),
      timeoutPromise
    ]);

    const contentType = response.headers.get('content-type');
    let payload = null;

    if (contentType && contentType.includes('application/json')) {
      try {
        payload = await response.json();
      } catch (e) {
        // If JSON parsing fails, payload stays null
        console.error('Failed to parse JSON response:', e);
      }
    }

    if (!response.ok) {
      const message = payload?.message || payload?.errors?.[0]?.msg || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return payload;
  } catch (error) {
    // Handle network errors, timeouts, etc.
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error - cannot connect to server. Please check if the backend is running.');
    }
    // Re-throw other errors (including our timeout error)
    throw error;
  }
}

export { API_BASE_URL, request };
