"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, List, User } from "lucide-react";

/**
 * 하단 네비게이션 바 (Bottom Tab Bar)
 * Mobile First: 큰 터치 영역, 명확한 아이콘
 */
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "홈",
      href: "/",
      icon: Home,
    },
    {
      name: "입고",
      href: "/stock-in",
      icon: PlusSquare,
    },
    {
      name: "재고목록",
      href: "/inventory",
      icon: List,
    },
    {
      name: "설정",
      href: "/mypage",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-7 h-7 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
