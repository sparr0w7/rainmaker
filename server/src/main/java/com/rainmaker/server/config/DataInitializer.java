package com.rainmaker.server.config;

import com.rainmaker.server.domain.member.entity.Member;
import com.rainmaker.server.domain.member.entity.MemberRole;
import com.rainmaker.server.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 초기 데이터 생성
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements ApplicationRunner {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        // admin 계정이 없으면 생성
        if (memberRepository.findByUsername("admin").isEmpty()) {
            Member admin = Member.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("password"))
                    .role(MemberRole.ADMIN)
                    .build();

            memberRepository.save(admin);
            log.info("✅ 초기 관리자 계정 생성: username=admin, password=password");
        }
    }
}
