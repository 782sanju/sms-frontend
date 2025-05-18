import api from './axios';
import { LoginFormFields, SignupFormFields, IAuthResponse, IUser } from '@/types/auth.types';
import { AuthApiResponse } from '@/types/service.types';

class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  async login(data: LoginFormFields): Promise<IAuthResponse> {
    const response = await api.post<AuthApiResponse>('/auth/login', data);
    const authData = response.data.data.data;
    this.setToken(authData.token);
    this.setUser(authData.user);
    return authData;
  }

  async signup(data: Omit<SignupFormFields, 'confirmPassword'>): Promise<IAuthResponse> {
    const response = await api.post<AuthApiResponse>('/auth/signup', data);
    const authData = response.data.data.data;
    this.setToken(authData.token);
    this.setUser(authData.user);
    return authData;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): IUser | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: IUser): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export default new AuthService(); 