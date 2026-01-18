"use client";

import { useState } from "react";
import type { UseStockInReturn, Product } from "@/types/domain";

/**
 * Stock In Hook (입고 관리)
 * IDD: 비즈니스 로직을 UI로부터 완전히 분리
 */

// Mock 상품 데이터베이스
const MOCK_PRODUCTS: Record<string, Product> = {
  "SKU001": {
    id: "1",
    name: "남성 반팔 티셔츠",
    skuCode: "SKU001",
    price: 29000,
    options: { color: "블랙", size: "L" },
  },
  "SKU002": {
    id: "2",
    name: "여성 청바지",
    skuCode: "SKU002",
    price: 59000,
    options: { color: "다크블루", size: "M" },
  },
  "SKU003": {
    id: "3",
    name: "후드 집업",
    skuCode: "SKU003",
    price: 79000,
    options: { color: "그레이", size: "XL" },
  },
};

export function useStockIn(): UseStockInReturn {
  const [scannedCode, setScannedCode] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onScan = (code: string) => {
    setScannedCode(code);
    setError(null);

    if (!code.trim()) {
      setProduct(null);
      return;
    }

    // Mock API 호출 시뮬레이션 (500ms 딜레이)
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS[code.toUpperCase()];
      if (foundProduct) {
        setProduct(foundProduct);
        setError(null);
      } else {
        setProduct(null);
        setError("상품을 찾을 수 없습니다");
      }
      setIsLoading(false);
    }, 500);
  };

  const onChangeQuantity = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const onSubmit = async () => {
    if (!product) {
      setError("상품을 먼저 스캔해주세요");
      return;
    }

    setIsLoading(true);

    // Mock API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 성공 후 초기화
    alert(`입고 완료!\n상품: ${product.name}\n수량: ${quantity}개`);
    onReset();
    setIsLoading(false);
  };

  const onReset = () => {
    setScannedCode("");
    setProduct(null);
    setQuantity(1);
    setError(null);
  };

  return {
    scannedCode,
    product,
    quantity,
    isLoading,
    error,
    onScan,
    onChangeQuantity,
    onSubmit,
    onReset,
  };
}
