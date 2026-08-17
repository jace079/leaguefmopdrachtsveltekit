import { redirect } from '@sveltejs/kit';
import { users, broadcast } from '$lib/store';

export function load({ cookies }) {
  const userId = cookies.get('userId');
  const user = users[userId];
  if (!user) {
    throw redirect(302, '/');
  }
  return { user };
}

export const actions = {
  updateName: async ({ request, cookies }) => {
    const userId = cookies.get('userId');
    const user = users[userId];
    const data = await request.formData();
    const name = (data.get('name') || '').toString().trim();
    if (user && name) {
      user.name = name;
      broadcast();
    }
    throw redirect(303, '/dashboard');
  },
  logout: async ({ cookies }) => {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/');
  }
};
