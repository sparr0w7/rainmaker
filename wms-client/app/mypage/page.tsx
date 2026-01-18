"use client";

/**
 * 마이페이지 (설정 및 프로필)
 * Mobile First: 큰 터치 영역
 */
export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-xl text-gray-600">설정 페이지 (준비중)</p>
        </div>
      </main>
    </div>
  );
}
