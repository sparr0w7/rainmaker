"use client";

import { useStockIn } from "../hooks/useStockIn";

/**
 * Stock In Page (입고 화면)
 * Mobile First: 60대 어르신을 위한 큰 글자, 큰 터치 영역
 */
export function StockInPage() {
  const {
    scannedCode,
    product,
    quantity,
    isLoading,
    error,
    onScan,
    onChangeQuantity,
    onSubmit,
  } = useStockIn();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-primary p-4 text-primary-foreground">
        <h1 className="text-2xl font-bold">상품 입고</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-6 p-4">
        {/* 바코드 입력창 */}
        <section>
          <label
            htmlFor="barcode-input"
            className="mb-2 block text-xl font-semibold"
          >
            바코드 스캔
          </label>
          <input
            id="barcode-input"
            type="text"
            value={scannedCode}
            onChange={(e) => onScan(e.target.value)}
            placeholder="SKU001, SKU002, SKU003..."
            className="h-16 w-full rounded-lg border-2 border-border bg-background px-4 text-2xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-lg font-medium text-destructive">{error}</p>
          )}
        </section>

        {/* 상품 정보 카드 */}
        {product && (
          <section className="rounded-lg border-2 border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold text-card-foreground">
              상품 정보
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-lg text-muted-foreground">상품명:</span>
                <p className="text-2xl font-bold">{product.name}</p>
              </div>
              <div>
                <span className="text-lg text-muted-foreground">SKU:</span>
                <p className="text-xl font-mono">{product.skuCode}</p>
              </div>
              <div>
                <span className="text-lg text-muted-foreground">가격:</span>
                <p className="text-xl font-bold">
                  {product.price.toLocaleString()}원
                </p>
              </div>
              <div className="flex gap-4">
                {product.options.color && (
                  <div>
                    <span className="text-lg text-muted-foreground">색상:</span>
                    <p className="text-xl font-semibold">
                      {product.options.color}
                    </p>
                  </div>
                )}
                {product.options.size && (
                  <div>
                    <span className="text-lg text-muted-foreground">
                      사이즈:
                    </span>
                    <p className="text-xl font-semibold">
                      {product.options.size}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 수량 조절 */}
        {product && (
          <section className="rounded-lg border-2 border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold text-card-foreground">
              입고 수량
            </h2>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => onChangeQuantity(-1)}
                disabled={quantity <= 1 || isLoading}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary text-3xl font-bold text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  onChangeQuantity(value - quantity);
                }}
                min="1"
                disabled={isLoading}
                className="flex h-16 w-32 items-center justify-center rounded-lg border-2 border-border bg-background text-center text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
              />
              <button
                onClick={() => onChangeQuantity(1)}
                disabled={isLoading}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary text-3xl font-bold text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </section>
        )}
      </main>

      {/* 하단 고정 버튼 */}
      <footer className="border-t bg-background p-4">
        <button
          onClick={onSubmit}
          disabled={!product || isLoading}
          className="h-16 w-full rounded-lg bg-primary text-2xl font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "처리 중..." : "입고 확정"}
        </button>
      </footer>
    </div>
  );
}
