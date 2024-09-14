import axios from 'axios';

export async function checkTwoFAStatus() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    const apiUrl = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    const response = await axios.get(`${apiUrl}/api/check-twofa-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.isTwoFAEnabled;
  } catch (err) {
    console.error('Error checking Two-Factor Authentication status:', err);
    return false;
  }
}