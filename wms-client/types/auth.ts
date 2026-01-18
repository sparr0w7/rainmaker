/**
 * Auth Types (인증 관련 타입)
 * IDD: 인터페이스 우선 정의
 */

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface UseAuthReturn extends AuthState, AuthActions {}
