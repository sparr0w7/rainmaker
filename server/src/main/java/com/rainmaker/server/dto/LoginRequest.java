package com.rainmaker.server.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

/**
 * 로그인 요청 DTO
 */
@Schema(description = "로그인 요청")
public record LoginRequest(
        @Schema(description = "사용자명", example = "admin")
        @NotBlank(message = "사용자명은 필수입니다")
        String username,

        @Schema(description = "비밀번호", example = "password")
        @NotBlank(message = "비밀번호는 필수입니다")
        String password
) {
}
