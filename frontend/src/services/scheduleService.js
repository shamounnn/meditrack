import { request } from './apiClient';

async function getAllSchedules() {
  const data = await request('/schedules');
  return data.map(normalizeSchedule);
}

async function getScheduleById(scheduleId) {
  return normalizeSchedule(await request(`/schedules/${scheduleId}`));
}

async function getMedicationSchedules(medicationId) {
  const data = await request(`/schedules/medication/${medicationId}`);
  return data.map(normalizeSchedule);
}

async function getUserSchedules(userId) {
  const data = await request(`/schedules/user/${userId}`);
  return data.map(normalizeSchedule);
}

async function createSchedule(payload) {
  return normalizeSchedule(await request('/schedules', {
    method: 'POST',
    body: JSON.stringify(payload),
  }));
}

async function updateSchedule(scheduleId, payload) {
  return normalizeSchedule(await request(`/schedules/${scheduleId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }));
}

async function deleteSchedule(scheduleId) {
  await request(`/schedules/${scheduleId}`, { method: 'DELETE' });
}

export const scheduleService = {
  getAllSchedules,
  getScheduleById,
  getMedicationSchedules,
  getUserSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};

function normalizeSchedule(schedule) {
  if (!schedule) return schedule;
  return {
    ...schedule,
    scheduleId: schedule.id ?? schedule.scheduleId,
  };
}
