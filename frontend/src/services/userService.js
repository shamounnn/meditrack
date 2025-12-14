import { request } from './apiClient';

async function registerUser(payload) {
  return normalizeUser(await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }));
}

async function loginUser(payload) {
  return normalizeUser(await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }));
}

async function getUserById(userId) {
  return normalizeUser(await request(`/users/${userId}`));
}

async function getUserByUsername(username) {
  return normalizeUser(await request(`/users/username/${username}`));
}

async function getAllUsers() {
  const users = await request('/users');
  return users.map(normalizeUser);
}

async function deleteUser(userId) {
  await request(`/users/${userId}`, { method: 'DELETE' });
}

export const userService = {
  registerUser,
  loginUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  deleteUser,
};

function normalizeUser(result) {
  if (!result) return result;
  if (result.user && result.accessToken) {
    return {
      ...result,
      user: {
        ...result.user,
        userId: result.user.id ?? result.user.userId,
      },
    };
  }
  return {
    ...result,
    userId: result.id ?? result.userId,
  };
}
