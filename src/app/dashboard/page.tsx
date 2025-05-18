import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function DashboardPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload || typeof payload !== 'object' || !('username' in payload)) {
    return <div>Yetkisiz erişim</div>;
  }

  const username = (payload as { username: string }).username;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin, {username}</p>
    </div>
  );
}
