package com.rainmaker.server.domain.member.repository;

import com.rainmaker.server.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 회원 Repository
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

    /**
     * username으로 회원 조회
     */
    Optional<Member> findByUsername(String username);
}
