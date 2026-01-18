/**
 * Domain Types for Rainmaker WMS
 * IDD: All interfaces defined before implementation
 */

// ============================================
// Product Domain
// ============================================

export interface ProductOption {
  color?: string;
  size?: string;
}

export interface Product {
  id: string;
  name: string;
  skuCode: string;
  price: number;
  options: ProductOption;
}

// ============================================
// Stock In (입고) Domain
// ============================================

export interface StockInState {
  scannedCode: string;
  product: Product | null;
  quantity: number;
  isLoading: boolean;
  error: string | null;
}

export interface StockInActions {
  onScan: (code: string) => void;
  onChangeQuantity: (delta: number) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
}

export interface UseStockInReturn extends StockInState, StockInActions {}

// ============================================
// Inventory List (재고 목록) Domain
// ============================================

export interface InventoryItem {
  id: number;
  skuCode: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  location: string;
}

export interface InventoryListState {
  items: InventoryItem[];
  searchQuery: string;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface InventoryListActions {
  onSearch: (query: string) => void;
  onLoadMore: () => Promise<void>;
}

export interface UseInventoryListReturn
  extends InventoryListState,
    InventoryListActions {}
