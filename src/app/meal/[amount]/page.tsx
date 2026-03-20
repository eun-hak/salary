import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  calculateSalary,
  formatNumber,
  getMonthlySalary,
  KEY_SALARY_AMOUNTS,
  MEAL_AMOUNTS,
  FAMILY_COUNTS,
} from "@/lib/salary";
import { notFound } from "next/navigation";

type Params = Promise<{ amount: string }>;

export async function generateStaticParams() {
  return MEAL_AMOUNTS.map((amount) => ({ amount: String(amount) }));
}

const MEAL_LABELS: Record<number, string> = {
  0: "비과세 없음",
  100000: "월 10만원",
  200000: "월 20만원",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const mealAmount = parseInt(amountStr, 10);
  if (!MEAL_AMOUNTS.includes(mealAmount)) return {};

  const label = MEAL_LABELS[mealAmount];
  const sample5000 = calculateSalary(50_000_000, 1, mealAmount);
  const base5000 = calculateSalary(50_000_000, 1, 0);
  const diff = sample5000.takeHome - base5000.takeHome;

  return {
    title: `비과세 식대 ${label} 실수령액 2026 | 연봉별 세후 월급 표`,
    description: `2026년 비과세 식대 ${label} 적용 시 연봉별 월 실수령액 표. 연봉 5천만원 기준 월 ${formatNumber(sample5000.takeHome)}원${mealAmount > 0 ? `, 비과세 없음 대비 +${formatNumber(diff)}원 증가` : ""}. 식대 비과세 효과를 확인하세요.`,
    alternates: {
      canonical: `https://money.plentyer.com/meal/${mealAmount}`,
    },
    openGraph: {
      title: `비과세 식대 ${label} 2026 실수령액 표`,
      description: `연봉 5천만원 기준 월 ${formatNumber(sample5000.takeHome)}원. 비과세 식대 적용에 따른 실수령액 변화.`,
    },
  };
}

export default async function MealPage({ params }: { params: Params }) {
  const { amount: amountStr } = await params;
  const mealAmount = parseInt(amountStr, 10);
  if (!MEAL_AMOUNTS.includes(mealAmount)) notFound();

  const label = MEAL_LABELS[mealAmount];

  const rows = KEY_SALARY_AMOUNTS.map((amount) => {
    const row = calculateSalary(amount * 10000, 1, mealAmount);
    const base = calculateSalary(amount * 10000, 1, 0);
    return {
      amount,
      takeHome: row.takeHome,
      incomeTax: row.incomeTax,
      pension: row.pension,
      health: row.health,
      baseTakeHome: base.takeHome,
      diff: row.takeHome - base.takeHome,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `비과세 식대 ${label} 실수령액 2026년 기준`,
    description: `2026년 비과세 식대 ${label} 적용 연봉별 월 실수령액 표`,
    url: `https://money.plentyer.com/meal/${mealAmount}`,
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
          name: `비과세 식대 ${label} 실수령액`,
          item: `https://money.plentyer.com/meal/${mealAmount}`,
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
            <span>비과세 식대 {label}</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            비과세 식대 {label} 적용 실수령액 (2026년)
          </h1>
          <p className="text-gray-400 mt-2">
            2026년 최신 4대보험 요율 반영 · 부양가족 1명(본인) 기준
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 핵심 정보 카드 */}
        {mealAmount > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
            <h2 className="font-bold text-emerald-900 mb-2">
              비과세 식대 {label} 적용 효과
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              <div className="bg-white rounded-lg p-4 border border-emerald-100">
                <p className="text-xs text-gray-500 mb-1">연봉 3천만원 기준</p>
                <p className="font-bold text-emerald-700">
                  +
                  {formatNumber(
                    calculateSalary(30_000_000, 1, mealAmount).takeHome -
                      calculateSalary(30_000_000, 1, 0).takeHome,
                  )}
                  원/월
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-100">
                <p className="text-xs text-gray-500 mb-1">연봉 5천만원 기준</p>
                <p className="font-bold text-emerald-700">
                  +
                  {formatNumber(
                    calculateSalary(50_000_000, 1, mealAmount).takeHome -
                      calculateSalary(50_000_000, 1, 0).takeHome,
                  )}
                  원/월
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-100">
                <p className="text-xs text-gray-500 mb-1">연봉 7천만원 기준</p>
                <p className="font-bold text-emerald-700">
                  +
                  {formatNumber(
                    calculateSalary(70_000_000, 1, mealAmount).takeHome -
                      calculateSalary(70_000_000, 1, 0).takeHome,
                  )}
                  원/월
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 연봉별 실수령액 표 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">
              비과세 식대 {label} 기준 연봉별 실수령액 표 (2026)
            </h2>
            {mealAmount > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                괄호 안 수치는 비과세 없음 대비 월 실수령액 증가분
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
                    소득세
                  </th>
                  {mealAmount > 0 && (
                    <th className="text-right px-4 py-3 text-gray-600 font-semibold">
                      비과세 효과
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
                      {formatNumber(row.incomeTax)}원
                    </td>
                    {mealAmount > 0 && (
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

        {/* 다른 식대 금액 네비게이션 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            다른 비과세 식대 금액 비교
          </h2>
          <div className="flex flex-wrap gap-2">
            {MEAL_AMOUNTS.map((m) => (
              <Link
                key={m}
                href={`/meal/${m}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  m === mealAmount
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {MEAL_LABELS[m]}
              </Link>
            ))}
          </div>
        </div>

        {/* 해설 콘텐츠 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">
            비과세 식대와 실수령액의 관계
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              비과세 식대란 소득세법 제12조에 따라 세금이 부과되지 않는 식사
              보조금입니다. 2026년 현재 월{" "}
              <strong>20만원까지 비과세</strong>로 인정됩니다. 회사가 식대
              명목으로 급여에 포함해 지급하는 금액이 이에 해당합니다.
            </p>
            <p>
              비과세 식대의 핵심 장점은 4대보험료와 소득세{" "}
              <strong>모두에 영향</strong>을 준다는 점입니다. 비과세 금액은
              과세 대상 급여에서 제외되므로, 국민연금·건강보험·고용보험 산정
              기준이 낮아지고, 동시에 소득세 과세표준도 낮아집니다.
            </p>
            <p>
              예를 들어 연봉 5,000만원에 비과세 식대 월 20만원이 적용되면,
              연간 240만원이 비과세 처리됩니다. 이로 인해 4대보험료와 소득세가
              모두 줄어 월 실수령액이 약 2~3만원 증가합니다. 연간으로 환산하면
              약 24~36만원의 실질 이득입니다.
            </p>
            <p>
              단, 회사가 현물 식사(구내식당, 도시락 제공)를 제공하는 경우에는
              별도로 식대를 비과세로 처리할 수 없습니다. 식사 제공 또는 식대
              지급 중 하나만 비과세 혜택을 받을 수 있습니다.
            </p>
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
            {FAMILY_COUNTS.slice(0, 3).map((c) => (
              <Link
                key={c}
                href={`/family/${c}`}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <span>→</span> 부양가족 {c}명 기준 실수령액 표
              </Link>
            ))}
            <Link
              href="/guide/non-taxable-meal"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 비과세 식대 완벽 가이드
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <span>→</span> 2025 vs 2026 실수령액 비교
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
