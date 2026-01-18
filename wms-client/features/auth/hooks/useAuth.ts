"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UseAuthReturn, LoginRequest, User } from "@/types/auth";
import { authApi } from "@/lib/api/auth";

/**
 * Auth Hook (인증 관리)
 * IDD: 비즈니스 로직을 UI로부터 완전히 분리
 * Session(Cookie) 기반 인증
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.login(data);

      // 로그인 성공 시 사용자 정보 설정
      setUser({
        username: data.username,
        role: "ADMIN", // TODO: 백엔드에서 실제 role 정보 가져오기
      });
      setIsAuthenticated(true);

      // 메인 페이지로 이동
      router.push("/");
    } catch (err: any) {
      console.error("로그인 실패:", err);
      setError(err.response?.data?.message || "로그인에 실패했습니다");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.logout();

      // 사용자 정보 초기화
      setUser(null);
      setIsAuthenticated(false);

      // 로그인 페이지로 이동
      router.push("/login");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      setError("로그아웃에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 인증 상태 확인 (200 OK면 인증됨)
      await authApi.checkAuth();

      // TODO: 백엔드에서 사용자 정보를 반환하도록 수정 필요
      // 현재는 임시로 하드코딩
      setUser({
        username: "admin",
        role: "ADMIN",
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error("인증 확인 실패:", err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };
}
