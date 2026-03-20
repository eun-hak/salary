import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  calculateSalary,
  formatNumber,
  getMonthlySalary,
  KEY_SALARY_AMOUNTS,
  FAMILY_COUNTS,
  MEAL_AMOUNTS,
} from "@/lib/salary";
import { notFound } from "next/navigation";

type Params = Promise<{ count: string }>;

export async function generateStaticParams() {
  return FAMILY_COUNTS.map((count) => ({ count: String(count) }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { count: countStr } = await params;
  const count = parseInt(countStr, 10);
  if (!FAMILY_COUNTS.includes(count)) return {};

  const sample5000 = calculateSalary(50_000_000, count, 0);
  const base5000 = calculateSalary(50_000_000, 1, 0);
  const diff = sample5000.takeHome - base5000.takeHome;

  return {
    title: `부양가족 ${count}명 실수령액 2026 | 연봉별 세후 월급 표`,
    description: `2026년 부양가족 ${count}명 기준 연봉별 월 실수령액 표. 연봉 5천만원 기준 월 ${formatNumber(sample5000.takeHome)}원${count > 1 ? `, 부양가족 1명 대비 +${formatNumber(diff)}원` : ""}. 부양가족 수에 따른 소득세 차이를 확인하세요.`,
    alternates: {
      canonical: `https://money.plentyer.com/family/${count}`,
    },
    openGraph: {
      title: `부양가족 ${count}명 2026 실수령액 표`,
      description: `연봉 5천만원 기준 월 ${formatNumber(sample5000.takeHome)}원. 부양가족 수에 따른 소득세·실수령액 비교.`,
    },
  };
}

export default async function FamilyPage({ params }: { params: Params }) {
  const { count: countStr } = await params;
  const count = parseInt(countStr, 10);
  if (!FAMILY_COUNTS.includes(count)) notFound();

  const rows = KEY_SALARY_AMOUNTS.map((amount) => {
    const row = calculateSalary(amount * 10000, count, 0);
    const base = calculateSalary(amount * 10000, 1, 0);
    return {
      amount,
      takeHome: row.takeHome,
      incomeTax: row.incomeTax,
      localTax: row.localTax,
      baseTakeHome: base.takeHome,
      diff: row.takeHome - base.takeHome,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `부양가족 ${count}명 실수령액 2026년 기준`,
    description: `2026년 부양가족 ${count}명 기준 연봉별 월 실수령액 표`,
    url: `https://money.plentyer.com/family/${count}`,
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
          name: `부양가족 ${count}명 실수령액`,
          item: `https://money.plentyer.com/family/${count}`,
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
            <span>부양가족 {count}명</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            부양가족 {count}명 기준 실수령액 (2026년)
          </h1>
          <p className="text-gray-400 mt-2">
            2026년 최신 4대보험 요율 반영 · 비과세 없음 기준 · 소득세 간이세액표
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 핵심 정보 카드 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-blue-900 mb-2">
            부양가족 {count}명 핵심 정보
          </h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            부양가족이 {count}명이면 인적공제{" "}
            <strong>{formatNumber(count * 150)}만원</strong>이 연간 적용되어
            소득세 과세표준이 낮아집니다.
            {count === 1 &&
              " 본인 1명은 기본 설정으로, 모든 급여에서 인적공제 150만원이 적용됩니다."}
            {count === 2 &&
              " 배우자 또는 자녀 1명이 추가될 경우로, 1명 대비 연간 인적공제가 150만원 더 많습니다."}
            {count === 3 &&
              " 본인 + 배우자 + 자녀 1명 구성이 대표적이며, 소득세 절감 효과가 큽니다."}
            {count === 4 &&
              " 자녀 2명 이상 가정에 해당하며, 부양가족 1명 대비 월 실수령액 차이가 상당합니다."}
            {count === 5 &&
              " 대가족 구성으로, 소득세 절감 효과가 가장 크며 특히 고연봉 구간에서 차이가 두드러집니다."}
          </p>
        </div>

        {/* 연봉별 실수령액 표 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">
              부양가족 {count}명 기준 연봉별 실수령액 표 (2026)
            </h2>
            {count > 1 && (
              <p className="text-sm text-gray-500 mt-1">
                괄호 안 수치는 부양가족 1명(본인만) 대비 월 실수령액 증가분
              </p>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    연봉
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    월 세전
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                    월 실수령액
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-semibold hidden sm:table-cell">
                    소득세+지방세
                  </th>
                  {count > 1 && (
                    <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                      1명 대비
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
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
                    <td className="text-right px-4 py-3 text-gray-500">
                      {formatNumber(getMonthlySalary(row.amount))}원
                    </td>
                    <td className="text-right px-4 py-3 font-bold text-gray-900">
                      {formatNumber(row.takeHome)}원
                    </td>
                    <td className="text-right px-4 py-3 text-orange-600 hidden sm:table-cell">
                      {formatNumber(row.incomeTax + row.localTax)}원
                    </td>
                    {count > 1 && (
                      <td className="text-right px-4 py-3">
                        {row.diff > 0 ? (
                          <span className="text-emerald-600 font-semibold">
                            +{formatNumber(row.diff)}원
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 다른 부양가족 수 네비게이션 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            다른 부양가족 수 비교
          </h2>
          <div className="flex flex-wrap gap-2">
            {FAMILY_COUNTS.map((n) => (
              <Link
                key={n}
                href={`/family/${n}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  n === count
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                부양가족 {n}명
              </Link>
            ))}
          </div>
        </div>

        {/* 해설 콘텐츠 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            부양가족 수와 실수령액의 관계
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              근로소득세는 부양가족 수에 따라 달라집니다. 국세청 근로소득
              간이세액표에 따르면 부양가족 1인당 연간{" "}
              <strong>150만원의 인적공제</strong>가 추가 적용됩니다. 부양가족이
              많을수록 소득세 과세표준이 낮아져 소득세가 감소하고, 결과적으로
              월 실수령액이 늘어납니다.
            </p>
            <p>
              여기서 부양가족이란 기본공제 대상 가족을 의미합니다. 본인을 포함해
              배우자, 자녀(만 20세 이하), 부모(만 60세 이상), 형제자매(만 20세
              이하 또는 만 60세 이상) 등이 해당됩니다. 단, 소득이 있는 가족은
              공제 대상에서 제외됩니다.
            </p>
            <p>
              중요한 점은 4대보험료(국민연금, 건강보험, 장기요양, 고용보험)는
              부양가족 수와 <strong>무관</strong>하게 세전 급여에 고정 요율로
              계산됩니다. 부양가족 수는 오직 소득세와 지방소득세에만 영향을
              줍니다.
            </p>
            <p>
              연봉이 높을수록 부양가족 공제 효과가 커집니다. 연봉 3,000만원
              구간에서는 1명 추가 시 월 약 1~2만원 차이가 나지만, 연봉
              7,000만원 이상 고연봉 구간에서는 부양가족 1명 추가 시 월 3~5만원
              이상 차이가 날 수 있습니다.
            </p>
          </div>
        </div>

        {/* 인기 연봉 상세 링크 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            부양가족 {count}명 기준 인기 연봉 실수령액
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(
              (amount) => {
                const r = calculateSalary(amount * 10000, count, 0);
                return (
                  <Link
                    key={amount}
                    href={`/salary/${amount}`}
                    className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 hover:bg-primary-50 transition"
                  >
                    <p className="text-xs text-gray-500">
                      연봉 {formatNumber(amount)}만원
                    </p>
                    <p className="font-bold text-primary-700 text-sm mt-0.5">
                      월 {formatNumber(r.takeHome)}원
                    </p>
                  </Link>
                );
              },
            )}
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
              <span>→</span> 연봉 실수령액 계산기 (직접 계산)
            </Link>
            {MEAL_AMOUNTS.filter((m) => m > 0).map((m) => (
              <Link
                key={m}
                href={`/meal/${m}`}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <span>→</span> 비과세 식대 {formatNumber(m / 10000)}만원 적용
                실수령액
              </Link>
            ))}
            <Link
              href="/compare"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 2025 vs 2026 실수령액 비교
            </Link>
            <Link
              href="/guide/dependents"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 부양가족 공제 완벽 가이드
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
