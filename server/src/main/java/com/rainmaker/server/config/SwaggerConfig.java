package com.rainmaker.server.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Swagger/OpenAPI 문서 설정
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Rainmaker WMS & Mall API")
                        .description("의류 매장 재고 관리 및 폐쇄몰 API 문서")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Rainmaker Team")
                                .email("support@rainmaker.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("로컬 개발 서버"),
                        new Server()
                                .url("https://api.rainmaker.com")
                                .description("운영 서버")
                ));
    }
}
