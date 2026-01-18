package com.rainmaker.server.domain.product.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 재고
 */
@Entity
@Table(
    name = "inventory",
    indexes = @Index(name = "idx_product_option_location", columnList = "product_option_id, location")
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inventory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_option_id", nullable = false)
    private ProductOption productOption;

    @Column(length = 100)
    private String location;

    @Column(nullable = false)
    private Integer quantity;

    @Builder
    public Inventory(ProductOption productOption, String location, Integer quantity) {
        this.productOption = productOption;
        this.location = location;
        this.quantity = quantity;
    }

    // 재고 증가
    public void increaseQuantity(Integer amount) {
        this.quantity += amount;
    }

    // 재고 감소
    public void decreaseQuantity(Integer amount) {
        if (this.quantity < amount) {
            throw new IllegalStateException("재고가 부족합니다. 현재 재고: " + this.quantity);
        }
        this.quantity -= amount;
    }
}
