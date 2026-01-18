"use client";

import { useState, useMemo } from "react";
import type { UseStockOutReturn, Product, CartItem } from "@/types/domain";

/**
 * Stock Out Hook (출고/판매 관리)
 * IDD: 비즈니스 로직을 UI로부터 완전히 분리
 */

// Mock 상품 데이터베이스 (TODO: 백엔드 조회 API 구현 후 제거)
const MOCK_PRODUCTS: Record<string, Product> = {
  SKU001: {
    id: "1",
    name: "남성 반팔 티셔츠",
    skuCode: "SKU001",
    price: 29000,
    options: { color: "블랙", size: "L" },
  },
  SKU002: {
    id: "2",
    name: "여성 청바지",
    skuCode: "SKU002",
    price: 59000,
    options: { color: "다크블루", size: "M" },
  },
  SKU003: {
    id: "3",
    name: "후드 집업",
    skuCode: "SKU003",
    price: 79000,
    options: { color: "그레이", size: "XL" },
  },
};

export function useStockOut(): UseStockOutReturn {
  const [scannedCode, setScannedCode] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 총 합계 금액 자동 계산
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.salePrice * item.quantity,
      0
    );
  }, [cartItems]);

  const onScan = (code: string) => {
    setScannedCode(code);
    setError(null);

    if (!code.trim()) {
      return;
    }

    // Mock API 호출 시뮬레이션 (300ms 딜레이)
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS[code.toUpperCase()];
      if (foundProduct) {
        // 장바구니에 상품 추가
        const newCartItem: CartItem = {
          id: Date.now().toString(), // 고유 ID
          product: foundProduct,
          quantity: 1,
          salePrice: foundProduct.price,
        };
        setCartItems((prev) => [...prev, newCartItem]);
        setScannedCode(""); // 스캔 후 입력창 초기화
        setError(null);
      } else {
        setError("상품을 찾을 수 없습니다");
      }
      setIsLoading(false);
    }, 300);
  };

  const onRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const onChangeItemQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const onSubmit = async () => {
    if (cartItems.length === 0) {
      setError("장바구니가 비어있습니다");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 각 상품별로 출고 API 호출
      for (const item of cartItems) {
        // TODO: 실제 백엔드 API 호출
        await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
        console.log("출고 처리:", {
          skuCode: item.product.skuCode,
          quantity: item.quantity,
          salePrice: item.salePrice,
        });
      }

      // 성공 후 초기화
      alert(
        `판매 완료!\n총 ${cartItems.length}개 상품\n합계: ${totalPrice.toLocaleString()}원`
      );
      setCartItems([]);
      setScannedCode("");
    } catch (err) {
      console.error("판매 실패:", err);
      setError("판매 처리 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scannedCode,
    cartItems,
    totalPrice,
    isLoading,
    error,
    onScan,
    onRemoveItem,
    onChangeItemQuantity,
    onSubmit,
  };
}
