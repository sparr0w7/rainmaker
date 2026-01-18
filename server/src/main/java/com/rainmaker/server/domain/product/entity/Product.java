package com.rainmaker.server.domain.product.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 상품 마스터
 */
@Entity
@Table(name = "product")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOption> productOptions = new ArrayList<>();

    @Builder
    public Product(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    // 연관관계 편의 메서드
    public void addProductOption(ProductOption productOption) {
        this.productOptions.add(productOption);
        productOption.assignProduct(this);
    }
}
