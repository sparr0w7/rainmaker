"use client";

import { useInventoryList } from "@/features/inventory/hooks/useInventoryList";
import type { InventoryItem } from "@/types/domain";

/**
 * 재고 목록 페이지 (Inventory List Page)
 * IDD: useInventoryList Hook으로부터 상태와 액션을 받아 렌더링
 * Mobile First: 카드 뷰 레이아웃
 */
export default function InventoryListPage() {
  const {
    items,
    searchQuery,
    hasMore,
    isLoading,
    error,
    onSearch,
    onLoadMore,
  } = useInventoryList();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">재고 목록</h1>

          {/* 검색창 - Mobile First: 큰 터치 영역 */}
          <input
            type="text"
            placeholder="상품명, SKU, 옵션 검색..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-14 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 text-lg">
            {error}
          </div>
        )}

        {/* 재고 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <InventoryCard key={item.id} item={item} />
          ))}
        </div>

        {/* 빈 상태 */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">재고가 없습니다</p>
          </div>
        )}

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-4 text-lg text-gray-600">로딩 중...</p>
          </div>
        )}

        {/* 더 보기 버튼 - Mobile First: 큰 터치 영역 */}
        {hasMore && !isLoading && (
          <div className="mt-8 mb-8">
            <button
              onClick={onLoadMore}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors"
            >
              더 보기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * 재고 카드 컴포넌트
 * Mobile First: 큰 폰트, 명확한 레이아웃
 */
function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* 상단: 상품명 (굵게) */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {item.productName}
      </h3>

      {/* 중단: 옵션 + 수량 */}
      <div className="flex justify-between items-center mb-4">
        {/* 옵션 정보 */}
        <div className="text-lg text-gray-700">
          <p>
            {item.color} / {item.size}
          </p>
          <p className="text-base text-gray-500 mt-1">
            ₩{item.price.toLocaleString()}
          </p>
        </div>

        {/* 현재고 - 우측 강조, 큰 폰트 */}
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {item.quantity}
          </div>
          <div className="text-sm text-gray-500">재고</div>
        </div>
      </div>

      {/* 하단: SKU 코드 (작은 회색 폰트) */}
      <div className="border-t border-gray-100 pt-3 mt-3">
        <p className="text-sm text-gray-400">SKU: {item.skuCode}</p>
        <p className="text-sm text-gray-400">위치: {item.location}</p>
      </div>
    </div>
  );
}
