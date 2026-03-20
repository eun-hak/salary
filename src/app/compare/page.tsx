import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  calculateSalary,
  calculateSalary2025,
  formatNumber,
  getMonthlySalary,
  RATES,
  RATES_2025,
  KEY_SALARY_AMOUNTS,
} from "@/lib/salary";

export const metadata: Metadata = {
  title: "2025 vs 2026 연봉 실수령액 비교 | 4대보험 요율 변경 영향",
  description:
    "2025년과 2026년 연봉별 실수령액 차이를 한눈에 비교. 국민연금 4.5%→4.75%, 건강보험 3.545%→3.595% 인상으로 연봉 5천만원 기준 월 실수령액이 얼마나 줄었는지 확인하세요.",
  alternates: {
    canonical: "https://money.plentyer.com/compare",
  },
  openGraph: {
    title: "2025 vs 2026 연봉 실수령액 비교",
    description:
      "국민연금·건강보험 요율 인상으로 2026년 실수령액이 얼마나 달라졌는지 비교합니다.",
  },
};

export default function ComparePage() {
  const compareRows = KEY_SALARY_AMOUNTS.map((amount) => {
    const row2026 = calculateSalary(amount * 10000, 1, 0);
    const row2025 = calculateSalary2025(amount * 10000, 1, 0);
    const diff = row2026.takeHome - row2025.takeHome;
    return {
      amount,
      takeHome2025: row2025.takeHome,
      takeHome2026: row2026.takeHome,
      pension2025: row2025.pension,
      pension2026: row2026.pension,
      health2025: row2025.health,
      health2026: row2026.health,
      diff,
    };
  });

  const rateChanges = [
    {
      label: "국민연금",
      rate2025: "4.5%",
      rate2026: "4.75%",
      change: "+0.25%p",
      color: "text-blue-600",
    },
    {
      label: "건강보험",
      rate2025: "3.545%",
      rate2026: "3.595%",
      change: "+0.05%p",
      color: "text-emerald-600",
    },
    {
      label: "장기요양",
      rate2025: "12.95%",
      rate2026: "13.14%",
      change: "+0.19%p",
      color: "text-teal-600",
    },
    {
      label: "고용보험",
      rate2025: "0.9%",
      rate2026: "0.9%",
      change: "변동 없음",
      color: "text-gray-500",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "2025 vs 2026 연봉 실수령액 비교",
    description:
      "2025년과 2026년 연봉별 월 실수령액 차이. 4대보험 요율 인상 영향 분석.",
    url: "https://money.plentyer.com/compare",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://money.plentyer.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "2025 vs 2026 비교",
          item: "https://money.plentyer.com/compare",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition">
              연봉 실수령액 계산기
            </Link>
            <span>/</span>
            <span>2025 vs 2026 비교</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            2025 vs 2026 연봉 실수령액 비교
          </h1>
          <p className="text-gray-400 mt-2">
            4대보험 요율 변경으로 2026년 실수령액이 얼마나 달라졌는지 확인하세요
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 요율 변경 요약 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            2025 → 2026 4대보험 요율 변경 내역
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rateChanges.map((r) => (
              <div
                key={r.label}
                className="bg-gray-50 rounded-lg p-4 text-center"
              >
                <p className="text-xs text-gray-500 mb-1">{r.label}</p>
                <p className="text-sm text-gray-600">
                  {r.rate2025} → {r.rate2026}
                </p>
                <p className={`font-bold mt-1 ${r.color}`}>{r.change}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ※ 요율은 근로자 부담분 기준. 사업자도 동일 비율 추가 부담.
          </p>
        </div>

        {/* 상세 비교 표 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">
              연봉별 2025 vs 2026 월 실수령액 비교
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              부양가족 1명(본인), 비과세 없음 기준 · 마이너스(-) 값은 2026년에
              실수령액 감소
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    연봉
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    2025년 실수령액
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    2026년 실수령액
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    차이
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold hidden md:table-cell">
                    국민연금 증가
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.amount}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/salary/${row.amount}`}
                        className="font-medium text-primary-600 hover:underline"
                      >
                        {formatNumber(row.amount)}만원
                      </Link>
                    </td>
                    <td className="text-right px-4 py-3 text-gray-600">
                      {formatNumber(row.takeHome2025)}원
                    </td>
                    <td className="text-right px-4 py-3 font-semibold text-gray-900">
                      {formatNumber(row.takeHome2026)}원
                    </td>
                    <td className="text-right px-4 py-3">
                      <span
                        className={
                          row.diff < 0 ? "text-red-600 font-medium" : "text-gray-400"
                        }
                      >
                        {row.diff >= 0 ? "+" : ""}
                        {formatNumber(row.diff)}원
                      </span>
                    </td>
                    <td className="text-right px-4 py-3 text-blue-600 hidden md:table-cell">
                      +{formatNumber(row.pension2026 - row.pension2025)}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 영향 해설 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            2026년 요율 인상 영향 분석
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              2026년에는 국민연금 요율이{" "}
              <strong>4.5%에서 4.75%로 0.25%p 인상</strong>되었습니다. 이는
              2007년 이후 약 18년 만의 인상으로, 국민연금 재정 안정화를 위한
              단계적 조정의 첫 번째 단계입니다. 2028년까지 단계적으로 5.0%까지
              인상될 예정입니다.
            </p>
            <p>
              건강보험 요율도 3.545%에서 3.595%로 0.05%p 소폭 인상되었습니다.
              장기요양보험은 건강보험료의 13.14%로 역시 소폭 오른 수준입니다.
              고용보험은 0.9%로 변동이 없습니다.
            </p>
            <p>
              연봉 5,000만원 기준으로 계산하면, 국민연금 인상분은 월 약{" "}
              {formatNumber(
                calculateSalary(50_000_000, 1, 0).pension -
                  calculateSalary2025(50_000_000, 1, 0).pension,
              )}
              원, 건강보험 인상분은 월 약{" "}
              {formatNumber(
                calculateSalary(50_000_000, 1, 0).health -
                  calculateSalary2025(50_000_000, 1, 0).health,
              )}
              원 정도 추가 부담이 발생합니다. 합산하면 월 약 1~2만원의 실수령액
              감소 효과입니다.
            </p>
            <p>
              연봉이 높을수록 인상 금액도 커지지만, 국민연금은 상한선(월 약
              637만원 기준)이 있어 연봉 약 7,644만원 이상에서는 국민연금
              증가분이 동일하게 적용됩니다. 반면 건강보험은 상한이 없어 연봉이
              높을수록 인상 부담이 계속 증가합니다.
            </p>
          </div>
        </div>

        {/* 연도별 요율 비교 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            연도별 4대보험 요율 변화
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    구분
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    2025년
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    2026년
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    변화
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "국민연금",
                    v25: `${(RATES_2025.pension * 100).toFixed(2)}%`,
                    v26: `${(RATES.pension * 100).toFixed(2)}%`,
                    delta: "+0.25%p",
                    red: true,
                  },
                  {
                    label: "건강보험",
                    v25: `${(RATES_2025.health * 100).toFixed(3)}%`,
                    v26: `${(RATES.health * 100).toFixed(3)}%`,
                    delta: "+0.05%p",
                    red: true,
                  },
                  {
                    label: "장기요양 (건보 대비)",
                    v25: `${(RATES_2025.longCareRatio * 100).toFixed(2)}%`,
                    v26: `${(RATES.longCareRatio * 100).toFixed(2)}%`,
                    delta: "+0.19%p",
                    red: true,
                  },
                  {
                    label: "고용보험",
                    v25: `${(RATES_2025.employment * 100).toFixed(1)}%`,
                    v26: `${(RATES.employment * 100).toFixed(1)}%`,
                    delta: "변동 없음",
                    red: false,
                  },
                ].map((r, i) => (
                  <tr
                    key={r.label}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {r.label}
                    </td>
                    <td className="text-right px-4 py-3 text-gray-600">
                      {r.v25}
                    </td>
                    <td className="text-right px-4 py-3 font-semibold text-gray-900">
                      {r.v26}
                    </td>
                    <td
                      className={`text-right px-4 py-3 font-medium ${r.red ? "text-red-600" : "text-gray-400"}`}
                    >
                      {r.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 관련 페이지 */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-4">관련 페이지</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 2026년 연봉 실수령액 계산기
            </Link>
            <Link
              href="/salary/5000"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 연봉 5천만원 실수령액 상세
            </Link>
            <Link
              href="/guide/insurance-rates"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 2026 4대보험 요율 완벽 가이드
            </Link>
            <Link
              href="/guide/how-to-increase"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 실수령액 높이는 5가지 방법
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
