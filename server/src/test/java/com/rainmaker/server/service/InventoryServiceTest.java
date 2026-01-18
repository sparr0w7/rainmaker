package com.rainmaker.server.service;

import com.rainmaker.server.dto.StockInRequest;
import com.rainmaker.server.entity.Inventory;
import com.rainmaker.server.repository.InventoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * TDD: InventoryService 비즈니스 로직 테스트
 * Repository는 Mocking하여 DB 없이 로직만 검증
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("재고 관리 서비스 테스트")
class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    @DisplayName("[RED] 신규 상품 입고 - 재고가 없으면 새로 생성")
    void processStockIn_WhenProductNotExists_ShouldCreateNewInventory() {
        // Given: 신규 상품 입고 요청
        StockInRequest request = new StockInRequest(
                "SKU001",
                "남성 반팔 티셔츠",
                "블랙",
                "L",
                29000,
                10
        );

        // When: Repository에 해당 SKU가 없음 (신규 상품)
        when(inventoryRepository.findBySkuCode(anyString())).thenReturn(Optional.empty());
        when(inventoryRepository.save(any(Inventory.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Then: 서비스 호출
        inventoryService.processStockIn(request);

        // Verify: 새로운 재고 생성
        verify(inventoryRepository, times(1)).findBySkuCode("SKU001");
        verify(inventoryRepository, times(1)).save(argThat(inventory ->
                inventory.getSkuCode().equals("SKU001") &&
                inventory.getProductName().equals("남성 반팔 티셔츠") &&
                inventory.getQuantity() == 10
        ));
    }

    @Test
    @DisplayName("[RED] 기존 상품 입고 - 재고가 있으면 수량 증가")
    void processStockIn_WhenProductExists_ShouldIncreaseQuantity() {
        // Given: 기존 상품 입고 요청 (추가 5개)
        StockInRequest request = new StockInRequest(
                "SKU001",
                "남성 반팔 티셔츠",
                "블랙",
                "L",
                29000,
                5
        );

        // When: Repository에 기존 재고 있음 (현재 수량 10개)
        Inventory existingInventory = Inventory.builder()
                .skuCode("SKU001")
                .productName("남성 반팔 티셔츠")
                .color("블랙")
                .size("L")
                .price(29000)
                .quantity(10)
                .build();

        when(inventoryRepository.findBySkuCode("SKU001")).thenReturn(Optional.of(existingInventory));

        // Then: 서비스 호출
        inventoryService.processStockIn(request);

        // Verify: 수량이 15개로 증가
        assertThat(existingInventory.getQuantity()).isEqualTo(15);
        verify(inventoryRepository, times(1)).findBySkuCode("SKU001");
        verify(inventoryRepository, never()).save(any()); // 기존 엔티티라서 명시적 save 불필요 (변경 감지)
    }

    @Test
    @DisplayName("[RED] 입고 처리 - 상품명과 옵션 정보가 정확히 저장됨")
    void processStockIn_ShouldSaveAllProductDetails() {
        // Given: 상세 정보 포함한 입고 요청
        StockInRequest request = new StockInRequest(
                "SKU002",
                "여성 청바지",
                "다크블루",
                "M",
                59000,
                20
        );

        // When: 신규 상품
        when(inventoryRepository.findBySkuCode("SKU002")).thenReturn(Optional.empty());
        when(inventoryRepository.save(any(Inventory.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Then: 서비스 호출
        inventoryService.processStockIn(request);

        // Verify: 모든 상품 정보가 정확히 저장됨
        verify(inventoryRepository).save(argThat(inventory ->
                inventory.getSkuCode().equals("SKU002") &&
                inventory.getProductName().equals("여성 청바지") &&
                inventory.getColor().equals("다크블루") &&
                inventory.getSize().equals("M") &&
                inventory.getPrice() == 59000 &&
                inventory.getQuantity() == 20
        ));
    }
}
