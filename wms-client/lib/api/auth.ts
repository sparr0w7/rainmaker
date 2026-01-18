import { apiClient } from "./client";
import type { LoginRequest, User } from "@/types/auth";

/**
 * 인증 API
 */
export const authApi = {
  /**
   * 로그인
   */
  async login(data: LoginRequest): Promise<void> {
    await apiClient.post("/api/auth/login", data);
  },

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
  },

  /**
   * 인증 상태 확인
   */
  async checkAuth(): Promise<User> {
    const response = await apiClient.get<User>("/api/auth/check");
    return response.data;
  },
};
