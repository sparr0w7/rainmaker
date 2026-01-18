package com.rainmaker.server.domain.product.repository;

import com.rainmaker.server.domain.product.entity.Inventory;
import com.rainmaker.server.domain.product.entity.ProductOption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    /**
     * 재고 목록 조회 (Fetch Join으로 N+1 문제 방지)
     * Inventory -> ProductOption -> Product를 한 번에 조회
     */
    @Query("SELECT i FROM Inventory i " +
           "JOIN FETCH i.productOption po " +
           "JOIN FETCH po.product p " +
           "ORDER BY i.updatedAt DESC")
    Page<Inventory> findAllWithProductAndOption(Pageable pageable);
}
