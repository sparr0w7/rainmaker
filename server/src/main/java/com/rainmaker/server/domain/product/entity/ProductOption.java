package com.rainmaker.server.domain.product.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 상품 옵션 (실제 SKU)
 */
@Entity
@Table(
    name = "product_option",
    indexes = @Index(name = "idx_sku_code", columnList = "skuCode")
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductOption extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(length = 50)
    private String color;

    @Column(length = 20)
    private String size;

    @Column(nullable = false, unique = true, length = 50)
    private String skuCode;

    @Builder
    public ProductOption(String color, String size, String skuCode) {
        this.color = color;
        this.size = size;
        this.skuCode = skuCode;
    }

    // 연관관계 편의 메서드 (내부용)
    void assignProduct(Product product) {
        this.product = product;
    }
}
