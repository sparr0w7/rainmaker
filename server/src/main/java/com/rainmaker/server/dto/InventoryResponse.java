package com.rainmaker.server.dto;

import com.rainmaker.server.domain.product.entity.Inventory;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 재고 목록 응답 DTO
 */
@Schema(description = "재고 목록 응답")
public record InventoryResponse(
        @Schema(description = "재고 ID", example = "1")
        Long id,

        @Schema(description = "SKU 코드", example = "SKU001")
        String skuCode,

        @Schema(description = "상품명", example = "남성 반팔 티셔츠")
        String productName,

        @Schema(description = "색상", example = "블랙")
        String color,

        @Schema(description = "사이즈", example = "L")
        String size,

        @Schema(description = "가격", example = "29000")
        Integer price,

        @Schema(description = "현재고", example = "50")
        Integer quantity,

        @Schema(description = "위치", example = "기본 창고")
        String location
) {
    public static InventoryResponse from(Inventory inventory) {
        return new InventoryResponse(
                inventory.getId(),
                inventory.getProductOption().getSkuCode(),
                inventory.getProductOption().getProduct().getName(),
                inventory.getProductOption().getColor(),
                inventory.getProductOption().getSize(),
                inventory.getProductOption().getProduct().getPrice(),
                inventory.getQuantity(),
                inventory.getLocation()
        );
    }
}
