package com.rainmaker.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rainmaker.server.dto.StockInRequest;
import com.rainmaker.server.service.InventoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * TDD: AdminInventoryController 인수 테스트
 * Red -> Green -> Refactor
 */
@WebMvcTest(AdminInventoryController.class)
@AutoConfigureMockMvc(addFilters = false)  // Spring Security 필터 비활성화
@DisplayName("관리자 재고 API 인수 테스트")
class AdminInventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private InventoryService inventoryService;

    @Test
    @DisplayName("[RED] POST /api/admin/inventory/inbound - 입고 요청 시 200 OK 반환")
    void stockIn_ShouldReturn200() throws Exception {
        // Given: 입고 요청 DTO
        StockInRequest request = new StockInRequest(
                "SKU001",           // skuCode
                "남성 반팔 티셔츠",   // productName
                "블랙",              // color
                "L",                // size
                29000,              // price
                10                  // quantity
        );

        // When: Service는 정상 처리를 가정 (Mocking)
        doNothing().when(inventoryService).processStockIn(any(StockInRequest.class));

        // Then: POST 요청 시 200 OK
        mockMvc.perform(post("/api/admin/inventory/inbound")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[RED] POST /api/admin/inventory/inbound - 수량이 0 이하면 400 Bad Request")
    void stockIn_WithInvalidQuantity_ShouldReturn400() throws Exception {
        // Given: 잘못된 수량 (0)
        StockInRequest request = new StockInRequest(
                "SKU001",
                "남성 반팔 티셔츠",
                "블랙",
                "L",
                29000,
                0  // Invalid
        );

        // Then: 400 Bad Request
        mockMvc.perform(post("/api/admin/inventory/inbound")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
