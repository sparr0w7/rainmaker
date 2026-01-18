"use client";

import { useState, useEffect } from "react";
import type { UseDashboardReturn, DashboardStats } from "@/types/domain";

/**
 * Dashboard Hook (홈 대시보드)
 * IDD: 비즈니스 로직을 UI로부터 완전히 분리
 */
export function useDashboard(): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats>({
    totalStockQuantity: 0,
    todayRevenue: 0,
    lowStockCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: 실제 백엔드 API 호출
      // Mock API 호출 시뮬레이션 (500ms 딜레이)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock 데이터
      const mockStats: DashboardStats = {
        totalStockQuantity: 1247, // 총 재고 수량
        todayRevenue: 387000, // 오늘 예상 매출
        lowStockCount: 3, // 재고 부족 상품 수
      };

      setStats(mockStats);
    } catch (err) {
      console.error("대시보드 조회 실패:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    await fetchDashboardStats();
  };

  // 컴포넌트 마운트 시 자동으로 데이터 로드
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    onRefresh,
  };
}
