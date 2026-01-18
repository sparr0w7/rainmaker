"use client";

import Link from "next/link";
import { PlusSquare, List, Package } from "lucide-react";

/**
 * 홈/대시보드 페이지
 * Mobile First: 큰 카드, 명확한 아이콘
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Rainmaker WMS</h1>
          <p className="text-gray-600 mt-1">재고 관리 시스템</p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 빠른 작업 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 입고 카드 */}
          <Link href="/stock-in">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <PlusSquare className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">입고</h2>
                  <p className="text-gray-600 mt-1">상품 입고 처리</p>
                </div>
              </div>
            </div>
          </Link>

          {/* 재고 목록 카드 */}
          <Link href="/inventory">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <List className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">재고 목록</h2>
                  <p className="text-gray-600 mt-1">재고 현황 조회</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 요약 정보 (준비중) */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">오늘의 요약</h3>
          </div>
          <p className="text-gray-600">통계 기능 준비중입니다.</p>
        </div>
      </main>
    </div>
  );
}
