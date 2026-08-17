import { randomUUID } from 'crypto';

const users = {};

export function load({ cookies }) {
  const userId = cookies.get('userId');
  const user = users[userId];
  if (user) {
    return { user, users: null };
  }
  return { user: null, users: Object.values(users) };
}

export const actions = {
  create: async ({ request, cookies }) => {
    const data = await request.formData();
    const name = (data.get('name') || '').toString().trim();
    if (name) {
      const id = randomUUID();
      users[id] = { id, name };
      cookies.set('userId', id, { path: '/' });
    }
  },
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const id = data.get('id');
    if (users[id]) {
      cookies.set('userId', id, { path: '/' });
    }
  },
  updateName: async ({ request, cookies }) => {
    const userId = cookies.get('userId');
    const user = users[userId];
    const data = await request.formData();
    const name = (data.get('name') || '').toString().trim();
    if (user && name) {
      user.name = name;
    }
  },
  logout: async ({ cookies }) => {
    cookies.delete('userId', { path: '/' });
  }
};
