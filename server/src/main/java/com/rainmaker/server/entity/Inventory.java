package com.rainmaker.server.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 재고 엔티티
 */
@Entity
@Table(name = "inventory")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String skuCode;

    @Column(nullable = false, length = 200)
    private String productName;

    @Column(length = 50)
    private String color;

    @Column(length = 20)
    private String size;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer quantity;

    @Builder
    public Inventory(String skuCode, String productName, String color, String size, Integer price, Integer quantity) {
        this.skuCode = skuCode;
        this.productName = productName;
        this.color = color;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * 재고 수량 증가
     */
    public void increaseQuantity(int amount) {
        this.quantity += amount;
    }
}
