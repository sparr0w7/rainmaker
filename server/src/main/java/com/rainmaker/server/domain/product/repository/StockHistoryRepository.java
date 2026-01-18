package com.rainmaker.server.domain.product.repository;

import com.rainmaker.server.domain.product.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 입출고 이력 Repository
 */
public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {
}
