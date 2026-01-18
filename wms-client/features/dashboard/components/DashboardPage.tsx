"use client";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Dashboard Page (홈 대시보드)
 * IDD: Hook으로부터 Props를 받아 UI만 렌더링
 */
export default function DashboardPage() {
  const { stats, isLoading, error, onRefresh } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-2xl text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
        <p className="text-xl text-red-500">{error}</p>
        <button
          onClick={onRefresh}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Rainmaker WMS
        </h1>
        <p className="text-lg text-gray-600">
          오늘도 좋은 하루 되세요! 🌟
        </p>
      </div>

      {/* 스탯 카드 그리드 (모바일 1열, PC 3열) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 📦 총 재고 수량 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-600 font-normal">
              📦 총 재고 수량
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-blue-600">
              {stats.totalStockQuantity.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">개</p>
          </CardContent>
        </Card>

        {/* 💰 오늘 예상 매출 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-600 font-normal">
              💰 오늘 예상 매출
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-green-600">
              {stats.todayRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">원</p>
          </CardContent>
        </Card>

        {/* 🚨 재고 부족 알림 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-600 font-normal">
              🚨 재고 부족 알림
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-red-600">
              {stats.lowStockCount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              5개 미만 상품 수
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 새로고침 버튼 */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onRefresh}
          className="px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg hover:bg-gray-800 active:bg-gray-900"
        >
          🔄 새로고침
        </button>
      </div>
    </div>
  );
}
