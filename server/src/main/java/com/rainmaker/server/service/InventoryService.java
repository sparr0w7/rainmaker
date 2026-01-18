package com.rainmaker.server.service;

import com.rainmaker.server.dto.StockInRequest;
import com.rainmaker.server.entity.Inventory;
import com.rainmaker.server.repository.InventoryRepository;
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

    private final InventoryRepository inventoryRepository;

    /**
     * 입고 처리
     * - 신규 상품: 재고 생성
     * - 기존 상품: 수량 증가
     */
    public void processStockIn(StockInRequest request) {
        inventoryRepository.findBySkuCode(request.skuCode())
                .ifPresentOrElse(
                        // 기존 재고 있음 -> 수량 증가
                        inventory -> inventory.increaseQuantity(request.quantity()),
                        // 재고 없음 -> 새로 생성
                        () -> {
                            Inventory newInventory = Inventory.builder()
                                    .skuCode(request.skuCode())
                                    .productName(request.productName())
                                    .color(request.color())
                                    .size(request.size())
                                    .price(request.price())
                                    .quantity(request.quantity())
                                    .build();
                            inventoryRepository.save(newInventory);
                        }
                );
    }
}
