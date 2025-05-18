import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Basit doğrulama, burada DB kullanabilirsin
  if (username === 'admin' && password === '1234') {
    const token = await createToken({ username });

    const response = NextResponse.json({ message: 'Giriş başarılı' });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
    });

    return response;
  }

  return NextResponse.json({ error: 'Geçersiz bilgiler' }, { status: 401 });
}
