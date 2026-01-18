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

// ============================================
// Stock Out (출고/판매) Domain
// ============================================

export interface CartItem {
  id: string; // 장바구니 내 고유 ID (타임스탬프 등)
  product: Product;
  quantity: number;
  salePrice: number; // 판매 가격
}

export interface StockOutState {
  scannedCode: string;
  cartItems: CartItem[];
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

export interface StockOutActions {
  onScan: (code: string) => void;
  onRemoveItem: (itemId: string) => void;
  onChangeItemQuantity: (itemId: string, delta: number) => void;
  onSubmit: () => Promise<void>;
}

export interface UseStockOutReturn extends StockOutState, StockOutActions {}

// ============================================
// Dashboard (홈 대시보드) Domain
// ============================================

export interface DashboardStats {
  totalStockQuantity: number; // 총 재고 수량
  todayRevenue: number; // 오늘 예상 매출
  lowStockCount: number; // 재고 부족 알림 (5개 미만)
}

export interface DashboardState {
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardActions {
  onRefresh: () => Promise<void>;
}

export interface UseDashboardReturn extends DashboardState, DashboardActions {}
