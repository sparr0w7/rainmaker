package com.rainmaker.server.controller;

import com.rainmaker.server.dto.StockInRequest;
import com.rainmaker.server.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 관리자 재고 관리 API
 */
@Tag(name = "재고 관리", description = "관리자용 재고 관리 API")
@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class AdminInventoryController {

    private final InventoryService inventoryService;

    @Operation(
            summary = "상품 입고",
            description = "바코드 스캔 또는 직접 입력을 통해 상품을 입고 처리합니다. " +
                         "신규 상품인 경우 재고를 생성하고, 기존 상품인 경우 수량을 증가시킵니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "입고 처리 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 (Validation 실패)",
                    content = @Content(schema = @Schema(implementation = String.class))
            )
    })
    @PostMapping("/inbound")
    public ResponseEntity<Void> stockIn(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "입고 요청 정보",
                    required = true,
                    content = @Content(schema = @Schema(implementation = StockInRequest.class))
            )
            @Valid @RequestBody StockInRequest request
    ) {
        inventoryService.processStockIn(request);
        return ResponseEntity.ok().build();
    }
}
