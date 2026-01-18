package com.rainmaker.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 입고 요청 DTO
 */
@Schema(description = "상품 입고 요청")
public record StockInRequest(
        @Schema(description = "SKU 코드 (바코드)", example = "SKU001", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "SKU 코드는 필수입니다")
        String skuCode,

        @Schema(description = "상품명", example = "남성 반팔 티셔츠", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "상품명은 필수입니다")
        String productName,

        @Schema(description = "색상", example = "블랙")
        String color,

        @Schema(description = "사이즈", example = "L")
        String size,

        @Schema(description = "가격 (원)", example = "29000", requiredMode = Schema.RequiredMode.REQUIRED, minimum = "0")
        @NotNull(message = "가격은 필수입니다")
        @Min(value = 0, message = "가격은 0 이상이어야 합니다")
        Integer price,

        @Schema(description = "입고 수량", example = "10", requiredMode = Schema.RequiredMode.REQUIRED, minimum = "1")
        @NotNull(message = "수량은 필수입니다")
        @Min(value = 1, message = "수량은 1 이상이어야 합니다")
        Integer quantity
) {
}
