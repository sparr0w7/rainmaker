package com.rainmaker.server.service;

import com.rainmaker.server.domain.product.entity.*;
import com.rainmaker.server.domain.product.repository.*;
import com.rainmaker.server.dto.StockInRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 재고 관리 서비스
 */
@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {

    private final ProductRepository productRepository;
    private final ProductOptionRepository productOptionRepository;
    private final InventoryRepository inventoryRepository;
    private final StockHistoryRepository stockHistoryRepository;

    /**
     * 입고 처리
     * - SKU 없음: Product + ProductOption + Inventory 생성
     * - SKU 있음: Inventory 수량 증가
     * - StockHistory 기록
     */
    public void processStockIn(StockInRequest request) {
        // 1. SKU 코드로 ProductOption 조회 또는 생성
        ProductOption productOption = productOptionRepository.findBySkuCode(request.skuCode())
                .orElseGet(() -> createProductAndOption(request));

        // 2. Inventory 조회 또는 생성
        Inventory inventory = inventoryRepository.findByProductOption(productOption)
                .orElseGet(() -> {
                    Inventory newInventory = Inventory.builder()
                            .productOption(productOption)
                            .location("기본 창고")
                            .quantity(0)
                            .build();
                    return inventoryRepository.save(newInventory);
                });

        // 3. 재고 증가
        inventory.increaseQuantity(request.quantity());

        // 4. 입고 이력 기록
        StockHistory history = StockHistory.builder()
                .productOption(productOption)
                .type(StockHistoryType.IN)
                .quantity(request.quantity())
                .snapshotQuantity(inventory.getQuantity())
                .build();
        stockHistoryRepository.save(history);
    }

    /**
     * Product + ProductOption 생성
     */
    private ProductOption createProductAndOption(StockInRequest request) {
        // Product 생성
        Product product = Product.builder()
                .name(request.productName())
                .price(request.price())
                .build();
        productRepository.save(product);

        // ProductOption 생성
        ProductOption productOption = ProductOption.builder()
                .color(request.color())
                .size(request.size())
                .skuCode(request.skuCode())
                .build();
        product.addProductOption(productOption);
        productOptionRepository.save(productOption);

        return productOption;
    }
}
