package com.rainmaker.server.repository;

import com.rainmaker.server.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 재고 Repository
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    /**
     * SKU 코드로 재고 조회
     */
    Optional<Inventory> findBySkuCode(String skuCode);
}
