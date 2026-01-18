package com.rainmaker.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 출고 요청 DTO
 */
@Schema(description = "상품 출고(판매) 요청")
public record StockOutRequest(
        @Schema(description = "SKU 코드 (바코드)", example = "SKU001", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "SKU 코드는 필수입니다")
        String skuCode,

        @Schema(description = "출고 수량", example = "2", requiredMode = Schema.RequiredMode.REQUIRED, minimum = "1")
        @NotNull(message = "수량은 필수입니다")
        @Min(value = 1, message = "수량은 1 이상이어야 합니다")
        Integer quantity,

        @Schema(description = "판매 가격 (원)", example = "29000", requiredMode = Schema.RequiredMode.REQUIRED, minimum = "0")
        @NotNull(message = "판매 가격은 필수입니다")
        @Min(value = 0, message = "판매 가격은 0 이상이어야 합니다")
        Integer salePrice
) {
}
