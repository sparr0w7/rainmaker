너는 지금부터 나의 '수석 프론트엔드 개발자'야.
우리는 아버지가 운영하는 의류 매장의 WMS(재고관리) 및 폐쇄몰 프로젝트인 'Rainmaker'를 만들 거야.

우리의 개발 원칙은 **IDD(Interface-Driven Development)**와 **Mobile First**야.
아래 가이드라인에 따라 첫 번째 기능인 **[상품 입고(Stock In)]** 화면을 구현해줘.

### 1. 프로젝트 아키텍처 규칙 (IDD)

모든 작업은 **Type 정의**부터 시작한다. 로직과 UI는 철저히 분리한다.

- `src/types/domain.ts`: 백엔드 데이터 및 핵심 상태 정의
- `src/features/inventory/hooks/`: 비즈니스 로직 구현 (인터페이스 구현체)
- `src/features/inventory/components/`: UI 구현 (인터페이스를 Props로 받음)

### 2. 디자인 가이드 (Mobile First)

주 사용자는 60대 어르신이며, 서서 일하는 환경이다.

- **Layout:** 기본 `flex-col` (수직 배치). `md` 이상에서만 가로 배치.
- **Touch:** 모든 버튼과 입력창의 높이는 최소 `h-14` (56px) 이상.
- **Font:** 기본 텍스트 `text-lg`, 강조 텍스트 `text-xl` 이상.
- **Library:** Shadcn UI + Tailwind CSS 사용.

---

### **[Task 1] 입고(Stock In) 기능 구현**

**Step 1. 인터페이스 정의 (`src/types/domain.ts`)**
가장 먼저 아래 내용을 포함하는 타입을 정의해.

- `Product`: id, name, skuCode, price, options(color, size)
- `StockInState`: scannedCode(입력된 바코드), product(찾은 상품), quantity(수량)
- `StockInActions`:
  - `onScan(code: string)`: 바코드 스캔/입력 시 실행
  - `onChangeQuantity(delta: number)`: 수량 조절 (+, -)
  - `onSubmit()`: 입고 확정

**Step 2. 비즈니스 로직 Hook (`useStockIn.ts`)**

- 위 State와 Actions 인터페이스를 리턴하는 Custom Hook을 만들어.
- 당장은 API 연동 없이 `setTimeout`으로 더미 데이터를 반환하도록 Mocking 해줘.

**Step 3. UI 컴포넌트 (`StockInPage.tsx`)**

- `useStockIn` 훅을 사용하여 화면을 그려.
- 상단: 바코드 입력창 (매우 크게)
- 중단: 상품 정보 카드 (상품명, 옵션) + 수량 조절 버튼 (매우 크게 -, +)
- 하단: [입고 확정] 버튼 (화면 하단 고정, Full Width)

지금 바로 **Step 1(타입 정의)**부터 코드를 작성해줘.
