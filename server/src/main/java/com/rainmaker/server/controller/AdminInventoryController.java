package com.rainmaker.server.controller;

import com.rainmaker.server.dto.InventoryResponse;
import com.rainmaker.server.dto.StockInRequest;
import com.rainmaker.server.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



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

    @Operation(
            summary = "재고 목록 조회",
            description = "전체 재고 목록을 페이징하여 조회합니다. 최근 업데이트된 순서로 정렬됩니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(schema = @Schema(implementation = Page.class))
            )
    })
    @GetMapping
    public ResponseEntity<Page<InventoryResponse>> getInventoryList(
            @Parameter(description = "페이지 번호 (0부터 시작)", example = "0")
            @RequestParam(defaultValue = "0") int page,

            @Parameter(description = "페이지 크기", example = "20")
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<InventoryResponse> inventories = inventoryService.getInventoryList(pageable);
        return ResponseEntity.ok(inventories);
    }
}
