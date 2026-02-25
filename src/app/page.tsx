import SalaryCalculator from "@/components/SalaryCalculator";
import SalaryTable from "@/components/SalaryTable";
import FAQ, { getFaqJsonLd } from "@/components/FAQ";
import Footer from "@/components/Footer";
import { RATES } from "@/lib/salary";

export default function Home() {
  const faqJsonLd = getFaqJsonLd();
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "2026년 연봉 실수령액 계산기",
    description:
      "2026년 최신 4대보험 요율 반영. 연봉별 실수령액과 공제 내역을 계산합니다.",
    url: "https://salary.plentyer.com",
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
            2026년 연봉 실수령액 계산기
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            최신 4대보험 요율과 국세청 간이세액표를 반영하여
            <br className="hidden md:block" />
            세후 월급, 공제 내역, 실수령율을 한 번에 확인하세요
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
