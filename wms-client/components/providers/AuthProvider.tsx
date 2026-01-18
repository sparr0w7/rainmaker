"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";

/**
 * 인증 Provider
 * 앱 로드 시 인증 상태를 확인하고, 미인증 시 로그인 페이지로 리다이렉트
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // 인증이 필요없는 페이지 목록
  const publicPaths = ["/login"];

  useEffect(() => {
    const checkAuth = async () => {
      // 공개 페이지는 인증 체크 생략
      if (publicPaths.includes(pathname)) {
        setIsChecking(false);
        return;
      }

      try {
        // 인증 상태 확인
        await authApi.checkAuth();
        setIsChecking(false);
      } catch (error) {
        // 인증 실패 시 로그인 페이지로 리다이렉트
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // 인증 체크 중에는 로딩 표시
  if (isChecking && !publicPaths.includes(pathname)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
