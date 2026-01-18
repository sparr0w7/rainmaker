package com.rainmaker.server.domain.product.repository;

import com.rainmaker.server.domain.product.entity.Inventory;
import com.rainmaker.server.domain.product.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 재고 Repository
 */
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    /**
     * 상품 옵션으로 재고 조회
     */
    Optional<Inventory> findByProductOption(ProductOption productOption);

    /**
     * 상품 옵션과 위치로 재고 조회
     */
    Optional<Inventory> findByProductOptionAndLocation(ProductOption productOption, String location);
}
