import { request } from './apiClient';

async function getAllMedications() {
  const meds = await request('/medications');
  return meds.map(normalizeMedication);
}

async function getMedicationById(medicationId) {
  return normalizeMedication(await request(`/medications/${medicationId}`));
}

async function getUserMedications(userId) {
  const meds = await request(`/medications/user/${userId}`);
  return meds.map(normalizeMedication);
}

async function getLowStockMedications(userId) {
  const meds = await request(`/medications/user/${userId}/low-stock`);
  return meds.map(normalizeMedication);
}

async function createMedication(payload) {
  return await request('/medications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function updateMedication(medicationId, payload) {
  return normalizeMedication(await request(`/medications/${medicationId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }));
}

async function deductMedication(medicationId, quantity = 1) {
  return normalizeMedication(await request(`/medications/${medicationId}/deduct`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  }));
}

async function deleteMedication(medicationId) {
  await request(`/medications/${medicationId}`, { method: 'DELETE' });
}

async function refillMedication(medicationId) {
  // Get current medication to know pillsPerBox
  const medication = await getMedicationById(medicationId);
  // Refill to full capacity
  return await updateMedication(medicationId, {
    currentPills: medication.pillsPerBox,
  });
}

function normalizeMedication(med) {
  if (!med) return med;
  return {
    ...med,
    medicationId: med.id ?? med.medicationId,
  };
}

export const medicationService = {
  getAllMedications,
  getMedicationById,
  getUserMedications,
  getLowStockMedications,
  createMedication,
  updateMedication,
  deductMedication,
  deleteMedication,
  refillMedication,
};
