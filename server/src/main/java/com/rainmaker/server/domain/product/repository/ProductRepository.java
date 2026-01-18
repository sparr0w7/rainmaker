package com.rainmaker.server.domain.product.repository;

import com.rainmaker.server.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 상품 Repository
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
