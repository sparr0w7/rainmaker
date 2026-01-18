package com.rainmaker.server.domain.product.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 입출고 이력
 */
@Entity
@Table(
    name = "stock_history",
    indexes = @Index(name = "idx_product_option_created", columnList = "product_option_id, createdAt")
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_option_id", nullable = false)
    private ProductOption productOption;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private StockHistoryType type;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer snapshotQuantity;

    @Builder
    public StockHistory(ProductOption productOption, StockHistoryType type, Integer quantity, Integer snapshotQuantity) {
        this.productOption = productOption;
        this.type = type;
        this.quantity = quantity;
        this.snapshotQuantity = snapshotQuantity;
    }
}
