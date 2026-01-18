import { apiClient } from "./client";
import type { Product } from "@/types/domain";

/**
 * 입고 요청 DTO
 */
export interface StockInRequest {
  skuCode: string;
  productName: string;
  color?: string;
  size?: string;
  price: number;
  quantity: number;
}

/**
 * 재고 관리 API
 */
export const inventoryApi = {
  /**
   * 상품 입고
   */
  async stockIn(request: StockInRequest): Promise<void> {
    await apiClient.post("/api/admin/inventory/inbound", request);
  },

  /**
   * SKU 코드로 상품 조회 (Mock - 추후 구현)
   */
  async getProductBySku(skuCode: string): Promise<Product | null> {
    // TODO: 실제 조회 API 구현 후 변경
    return null;
  },
};
