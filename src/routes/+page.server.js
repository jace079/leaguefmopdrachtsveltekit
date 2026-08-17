import { randomUUID } from 'crypto';
import { redirect } from '@sveltejs/kit';
import { users, broadcast } from '$lib/store';

export function load({ cookies }) {
  const userId = cookies.get('userId');
  if (userId && users[userId]) {
    throw redirect(302, '/dashboard');
  }
  return { users: Object.values(users) };
}

export const actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const name = (data.get('name') || '').toString().trim();
    if (name) {
      const id = randomUUID();
      users[id] = { id, name };
      cookies.set('userId', id, { path: '/' });
      broadcast();
    }
    throw redirect(303, '/');
  },
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const id = data.get('id');
    if (users[id]) {
      cookies.set('userId', id, { path: '/' });
    }
    throw redirect(303, '/dashboard');
  }
};
