"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { LogOut } from "lucide-react";

/**
 * 마이페이지 (설정 및 프로필)
 * Mobile First: 큰 터치 영역
 */
export default function MyPage() {
  const { logout, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* 계정 정보 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">계정 정보</h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-700">
              <span className="font-medium">사용자:</span> admin
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-medium">권한:</span> 관리자
            </p>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={logout}
          disabled={isLoading}
          className="w-full h-16 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xl font-semibold rounded-lg transition-colors flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              로그아웃 중...
            </>
          ) : (
            <>
              <LogOut className="w-6 h-6" />
              로그아웃
            </>
          )}
        </button>
      </main>
    </div>
  );
}
