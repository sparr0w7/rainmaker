import axios from "axios";

/**
 * API 클라이언트 (axios 인스턴스)
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized: 인증 실패 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      // 로그인 페이지가 아닌 경우에만 리다이렉트
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
