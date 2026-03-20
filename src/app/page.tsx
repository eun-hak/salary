import SalaryCalculator from "@/components/SalaryCalculator";
import SalaryTable from "@/components/SalaryTable";
import FAQ, { getFaqJsonLd } from "@/components/FAQ";
import Footer from "@/components/Footer";
import Link from "next/link";
import { RATES, formatNumber, calculateSalary } from "@/lib/salary";

export default function Home() {
  const faqJsonLd = getFaqJsonLd();
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "2026년 연봉 실수령액 계산기",
    description:
      "2026년 최신 4대보험 요율 반영. 연봉별 실수령액과 공제 내역을 계산합니다.",
    url: "https://money.plentyer.com",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {RATES.year}년 국민연금 {(RATES.pension * 100).toFixed(2)}%, 건강보험{" "}
            {(RATES.health * 100).toFixed(3)}% 반영
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            2026 연봉 실수령액 표 & 계산기
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            국민연금 4.75%·건강보험 3.595% 반영 · 간이세액표 기준
            <br className="hidden md:block" />
            연봉별 세전 세후 차이, 4대보험 공제 내역을 한눈에 확인하세요
          </p>

          <nav className="flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="#calculator"
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-lg shadow-primary-600/30"
            >
              실수령액 계산하기
            </a>
            <a
              href="#table"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-semibold transition backdrop-blur-sm"
            >
              연봉 실수령액 표
            </a>
            <a
              href="#faq"
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-semibold transition backdrop-blur-sm"
            >
              자주 묻는 질문
            </a>
          </nav>
        </div>
      </header>

      <main>
        <SalaryCalculator />
        <SalaryTable />

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              icon="📊"
              title="2026년 변경사항"
              items={[
                "국민연금: 4.5% → 4.75%",
                "건강보험: 3.545% → 3.595%",
                "장기요양: 12.95% → 13.14%",
              ]}
            />
            <InfoCard
              icon="💡"
              title="실수령액 늘리는 팁"
              items={[
                "비과세 식대 월 20만원 활용",
                "연말정산 소득공제 극대화",
                "퇴직연금(IRP) 세액공제",
              ]}
            />
            <InfoCard
              icon="📋"
              title="계산 기준"
              items={[
                "국세청 간이세액표 기준",
                "부양가족·비과세 선택 가능",
                "4대보험 근로자 부담분",
              ]}
            />
          </div>
        </section>

        {/* 인기 연봉 상세 페이지 링크 */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            인기 연봉 실수령액 바로 확인
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            자신의 연봉을 클릭하면 공제 내역 상세 페이지로 이동합니다
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(
              (amount) => {
                const row = calculateSalary(amount * 10000, 1, 0);
                return (
                  <Link
                    key={amount}
                    href={`/salary/${amount}`}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition group"
                  >
                    <p className="text-xs text-gray-500 mb-1">
                      연봉 {formatNumber(amount)}만원
                    </p>
                    <p className="font-bold text-primary-700 text-base group-hover:text-primary-800">
                      월 {formatNumber(row.takeHome)}원
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      공제 {formatNumber(row.totalDeduction)}원
                    </p>
                  </Link>
                );
              },
            )}
          </div>
        </section>

        {/* 조건별 계산 링크 */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            조건별 실수령액 계산
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            부양가족 수, 비과세 식대에 따라 실수령액이 달라집니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 부양가족 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-1">
                부양가족별 실수령액
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                부양가족 수에 따라 소득세가 달라집니다
              </p>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Link
                    key={n}
                    href={`/family/${n}`}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 text-sm transition group"
                  >
                    <span className="text-gray-700">
                      부양가족 {n}명 기준 실수령액 표
                    </span>
                    <span className="text-primary-600 text-xs group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {/* 비과세 식대 */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-1">
                비과세 식대별 실수령액
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                비과세 식대 적용 시 4대보험+소득세 절감
              </p>
              <div className="space-y-2">
                {[
                  { amount: 0, label: "비과세 없음 기준" },
                  { amount: 100000, label: "비과세 식대 월 10만원" },
                  { amount: 200000, label: "비과세 식대 월 20만원" },
                ].map((item) => (
                  <Link
                    key={item.amount}
                    href={`/meal/${item.amount}`}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 text-sm transition group"
                  >
                    <span className="text-gray-700">{item.label}</span>
                    <span className="text-primary-600 text-xs group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 비교 & 가이드 링크 */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            비교 & 심화 가이드
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            실수령액을 더 자세히 이해하고 늘리는 방법을 알아보세요
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/compare",
                icon: "📊",
                title: "2025 vs 2026 비교",
                desc: "국민연금·건강보험 인상으로 실수령액이 얼마나 줄었나",
              },
              {
                href: "/guide/insurance-rates",
                icon: "🔢",
                title: "4대보험 요율 가이드",
                desc: "국민연금·건강보험·장기요양·고용보험 요율 완벽 설명",
              },
              {
                href: "/guide/income-tax",
                icon: "📋",
                title: "소득세 계산 방법",
                desc: "근로소득공제·인적공제·누진세율 단계별 이해",
              },
              {
                href: "/guide/non-taxable-meal",
                icon: "🍱",
                title: "비과세 식대 가이드",
                desc: "식대 20만원 비과세로 연 24~36만원 절세하는 법",
              },
              {
                href: "/guide/dependents",
                icon: "👨‍👩‍👧",
                title: "부양가족 공제 가이드",
                desc: "인적공제 150만원으로 소득세를 줄이는 방법",
              },
              {
                href: "/guide/how-to-increase",
                icon: "💰",
                title: "실수령액 높이는 법",
                desc: "합법적으로 월급을 늘리는 5가지 실전 방법",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <FAQ />

        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2026년 연봉 실수령액 가이드
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              본 페이지에서는 2026년 최신 4대보험 요율(국민연금 4.75%, 건강보험
              3.595%, 장기요양보험 13.14%, 고용보험 0.9%)을 반영하여 연봉 구간별
              실수령액을 계산합니다. 부양가족 수와 비과세 식대 설정에 따라
              소득세와 실수령액이 달라지며, 계산기를 통해 개인 맞춤 결과를 확인할
              수 있습니다.
            </p>
            <p>
              연봉 3,000만원의 경우 월 실수령액은 약 224만원, 연봉 5,000만원은 약
              357만원, 연봉 1억원은 약 657만원 수준입니다. 연봉이 높아질수록
              소득세 누진 구간이 적용되어 실수령율이 낮아지는 경향이 있습니다.
            </p>
            <p>
              2026년에는 국민연금 요율이 4.5%에서 4.75%로 인상되어, 연봉
              5,000만원 기준 월 약 10,400원의 추가 부담이 발생합니다. 건강보험
              요율도 소폭 인상되어 월 약 2,100원이 추가됩니다.
            </p>
            <p>
              실수령액을 높이려면 비과세 식대(월 20만원 한도)를 적극 활용하고,
              연말정산 시 소득공제·세액공제 항목을 꼼꼼히 챙기는 것이 좋습니다.
              개인형 퇴직연금(IRP) 세액공제도 연간 최대 115.5만원까지 절세 효과가
              있습니다.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-primary-500 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
