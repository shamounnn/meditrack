import { request } from './apiClient';

async function getAllAlerts() {
  const alerts = await request('/alerts');
  return alerts.map(normalizeAlert);
}

async function getAlertById(alertId) {
  return normalizeAlert(await request(`/alerts/${alertId}`));
}

async function getUserAlerts(userId) {
  const alerts = await request(`/alerts/user/${userId}`);
  return alerts.map(normalizeAlert);
}

async function createAlert(payload) {
  return normalizeAlert(await request('/alerts', {
    method: 'POST',
    body: JSON.stringify(payload),
  }));
}

async function updateAlert(alertId, payload) {
  return normalizeAlert(await request(`/alerts/${alertId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }));
}

async function deleteAlert(alertId) {
  await request(`/alerts/${alertId}`, { method: 'DELETE' });
}

export const alertService = {
  getAllAlerts,
  getAlertById,
  getUserAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
};

function normalizeAlert(alert) {
  if (!alert) return alert;
  return {
    ...alert,
    alertId: alert.id ?? alert.alertId,
    medication1Id: alert.medication1Id ?? alert.medication1_id,
    medication2Id: alert.medication2Id ?? alert.medication2_id,
  };
}
