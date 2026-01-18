"use client";

import { useStockOut } from "@/features/sales/hooks/useStockOut";

/**
 * Stock Out / POS 판매 화면
 * IDD: Hook으로부터 Props를 받아 UI만 렌더링
 */
export default function StockOutPage() {
  const {
    scannedCode,
    cartItems,
    totalPrice,
    isLoading,
    error,
    onScan,
    onRemoveItem,
    onChangeItemQuantity,
    onSubmit,
  } = useStockOut();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 상단: 바코드 스캔 영역 */}
      <div className="bg-green-600 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">판매 (POS)</h1>
        <input
          type="text"
          value={scannedCode}
          onChange={(e) => onScan(e.target.value)}
          placeholder="바코드 스캔 (SKU001, SKU002, SKU003)"
          className="w-full h-16 px-4 text-xl text-gray-900 rounded-lg border-2 border-green-400 focus:outline-none focus:ring-4 focus:ring-green-300"
          autoFocus
        />
        {error && (
          <p className="mt-2 text-red-200 text-lg font-semibold">{error}</p>
        )}
      </div>

      {/* 중단: 장바구니 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-400">장바구니가 비어있습니다</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                {/* 상품 정보 */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product.skuCode} | {item.product.options.color} /{" "}
                    {item.product.options.size}
                  </p>
                  <p className="text-xl font-semibold text-green-600 mt-1">
                    {item.salePrice.toLocaleString()}원 × {item.quantity}개
                  </p>
                </div>

                {/* 수량 조절 버튼 */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChangeItemQuantity(item.id, -1)}
                    className="w-12 h-12 bg-gray-200 text-gray-700 text-2xl font-bold rounded-lg hover:bg-gray-300 active:bg-gray-400"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onChangeItemQuantity(item.id, +1)}
                    className="w-12 h-12 bg-gray-200 text-gray-700 text-2xl font-bold rounded-lg hover:bg-gray-300 active:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="w-12 h-12 bg-red-500 text-white text-2xl font-bold rounded-lg hover:bg-red-600 active:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단: Sticky Footer (총 합계 + 판매 완료 버튼) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-700">총 합계</span>
          <span className="text-4xl font-bold text-green-600">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading || cartItems.length === 0}
          className="w-full h-16 bg-green-600 text-white text-2xl font-bold rounded-lg hover:bg-green-700 active:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "처리 중..." : "판매 완료"}
        </button>
      </div>
    </div>
  );
}
