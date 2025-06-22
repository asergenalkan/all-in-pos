import { jwtVerify, SignJWT } from 'jose';
import Cookies from 'js-cookie';
import { User } from '@/types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export const TOKEN_COOKIE_NAME = 'auth-token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';

export async function signToken(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export function setAuthToken(token: string) {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}

export function setRefreshToken(token: string) {
  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}

export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
}

export function removeAuthTokens() {
  Cookies.remove(TOKEN_COOKIE_NAME);
  Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return !!token;
}

// Mock authentication for development
export const mockUser: User = {
  id: '1',
  email: 'admin@restaurant.com',
  name: 'Admin User',
  role: 'admin',
  restaurantId: 'rest-1',
  avatar: 'https://github.com/shadcn.png'
}; 