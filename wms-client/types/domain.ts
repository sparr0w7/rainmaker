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
