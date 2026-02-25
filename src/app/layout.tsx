import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://money.plentyer.com";
const SITE_NAME = "2026 연봉 실수령액 계산기";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "2026년 연봉 실수령액 계산기 - 세후 월급 표 & 공제 내역",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "2026년 최신 4대보험 요율(국민연금 4.75%, 건강보험 3.595%) 반영. 연봉별 실수령액 표와 계산기로 세후 월급, 국민연금, 건강보험, 소득세 공제 내역을 한 번에 확인하세요.",
  keywords: [
    "연봉 실수령액",
    "2026 연봉 계산기",
    "세후 월급",
    "실수령액 계산기",
    "4대보험 계산",
    "연봉 실수령액 표",
    "월급 실수령액",
    "소득세 계산",
    "국민연금 계산",
    "건강보험료 계산",
    "2026년 연봉",
    "연봉 세후",
  ],
  openGraph: {
    title: "2026년 연봉 실수령액 계산기 - 세후 월급 & 공제 내역",
    description:
      "2026년 최신 4대보험 요율 반영. 연봉별 실수령액과 공제 내역을 한 번에 확인하세요.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026년 연봉 실수령액 계산기",
    description:
      "최신 4대보험 요율 반영. 연봉별 세후 월급과 공제 내역을 확인하세요.",
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
