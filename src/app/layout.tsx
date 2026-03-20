import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://money.plentyer.com";
const SITE_NAME = "2026 실수령액 계산기";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "2026 연봉 실수령액 표 & 계산기 - 세전 세후 차이·4대보험 공제 내역",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "2026년 국민연금 4.75%·건강보험 3.595% 적용 연봉별 실수령액 표. 연봉 3천~1억 세전 세후 차이, 4대보험 공제 내역을 한눈에 확인. 부양가족 수·비과세 식대 조건별 계산 지원.",
  keywords: [
    // 저경쟁 표/조견표 계열
    "2026 연봉 실수령액 표",
    "연봉별 실수령액 표",
    "세전 세후 월급 차이",
    "연봉 공제 내역 표",
    "세후 월급 표 2026",
    // 요율 특화 (거의 경쟁 없음)
    "국민연금 4.75 실수령액",
    "건강보험 3.595 실수령액",
    "4대보험 공제 후 월급",
    "간이세액표 실수령액",
    // 조건별 롱테일
    "부양가족 실수령액 계산",
    "비과세 식대 실수령액",
    "2025 2026 실수령액 비교",
    "2026 실수령액 달라진 것",
    // 금액별 롱테일
    "연봉 3천 실수령액",
    "연봉 5천 세후 월급",
    "연봉 7천 실수령액",
    "연봉 1억 세후 월급",
    // 기타
    "월급 실수령율",
    "연봉 세전 세후",
  ],
  openGraph: {
    title: "2026 연봉 실수령액 표 - 세전 세후 차이 & 4대보험 공제 계산기",
    description:
      "국민연금 4.75%·건강보험 3.595% 반영. 연봉별 세전 세후 차이와 4대보험 공제 내역을 표로 확인하세요.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 연봉 실수령액 표 & 계산기",
    description:
      "국민연금 4.75%·건강보험 3.595% 반영. 연봉별 세전 세후 차이와 공제 내역을 한눈에 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "nGLC6wqeingyxdWpDtTR9DKlBw7TNDT9A8_l8PrHWt0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="8f6b5d88eb52da1b6362ae4efdef135627b53209"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GKLE187WJ1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GKLE187WJ1');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1410200096892996"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans">{children}</body>
    </html>
  );
}
