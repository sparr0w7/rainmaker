package com.rainmaker.server.domain.product.repository;

import com.rainmaker.server.domain.product.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 상품 옵션 Repository
 */
public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {

    /**
     * SKU 코드로 상품 옵션 조회
     */
    Optional<ProductOption> findBySkuCode(String skuCode);
}
