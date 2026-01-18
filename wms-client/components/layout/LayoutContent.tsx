"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

/**
 * Layout Content
 * 로그인 페이지에서는 BottomNav를 숨김
 */
export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {/* 메인 컨텐츠 - 하단 바에 가려지지 않게 pb-20 */}
      <div className={isLoginPage ? "" : "pb-20"}>{children}</div>

      {/* 하단 네비게이션 바 (로그인 페이지 제외) */}
      {!isLoginPage && <BottomNav />}
    </>
  );
}
