"use client";

import { useState, useEffect } from "react";
import type { UseInventoryListReturn, InventoryItem } from "@/types/domain";
import { inventoryApi } from "@/lib/api/inventory";

/**
 * Inventory List Hook (재고 목록 조회)
 * IDD: 비즈니스 로직을 UI로부터 완전히 분리
 */
export function useInventoryList(): UseInventoryListReturn {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 초기 로드
  useEffect(() => {
    loadInventory(0, true);
  }, []);

  const loadInventory = async (pageNum: number, reset: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await inventoryApi.getInventoryList(pageNum, 20);

      if (reset) {
        setItems(response.content);
      } else {
        setItems((prev) => [...prev, ...response.content]);
      }

      setPage(response.number);
      setHasMore(!response.last);
    } catch (err) {
      console.error("재고 목록 조회 실패:", err);
      setError("재고 목록을 불러오는 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: 검색 API 구현 후 실제 검색 로직 추가
    // 현재는 클라이언트 사이드 필터링
    if (!query.trim()) {
      loadInventory(0, true);
    }
  };

  const onLoadMore = async () => {
    if (!hasMore || isLoading) return;
    await loadInventory(page + 1, false);
  };

  // 클라이언트 사이드 검색 필터링
  const filteredItems = searchQuery.trim()
    ? items.filter(
        (item) =>
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.skuCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.size.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  return {
    items: filteredItems,
    searchQuery,
    page,
    hasMore,
    isLoading,
    error,
    onSearch,
    onLoadMore,
  };
}
