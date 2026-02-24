const faqs = [
  {
    question: "연봉 5,000만원의 2026년 월 실수령액은 얼마인가요?",
    answer:
      "연봉 5,000만원(월 약 416만원) 기준으로 2026년 월 실수령액은 약 357만원입니다. 국민연금 약 18.8만원, 건강보험 약 14.3만원, 장기요양 약 1.9만원, 고용보험 약 3.6만원, 소득세 약 18.9만원, 지방소득세 약 1.9만원이 공제됩니다. 부양가족 수와 비과세 항목에 따라 달라질 수 있습니다.",
  },
  {
    question: "2025년 대비 2026년 실수령액은 어떻게 달라지나요?",
    answer:
      "2026년에는 국민연금 요율이 4.5%에서 4.75%로, 건강보험 요율이 3.545%에서 3.595%로 인상되었습니다. 장기요양보험도 12.95%에서 13.14%로 올랐습니다. 이에 따라 연봉 5,000만원 기준 월 실수령액이 약 1~2만원 감소할 것으로 예상됩니다.",
  },
  {
    question: "국민연금 상한액이란 무엇인가요?",
    answer:
      "국민연금은 소득월액 상한선이 있어 월 보험료가 일정 금액 이상 올라가지 않습니다. 2026년 기준 국민연금 상한 보험료는 월 302,575원이며, 월 소득이 약 637만원(연봉 약 7,644만원) 이상이면 보험료가 더 이상 늘어나지 않습니다.",
  },
  {
    question: "부양가족 수에 따라 실수령액이 달라지나요?",
    answer:
      "네, 부양가족 수가 많을수록 소득세가 줄어들어 실수령액이 늘어납니다. 근로소득 간이세액표에서 부양가족 1명당 인적공제 150만원이 추가 적용되어 과세표준이 낮아지기 때문입니다. 예를 들어 연봉 5,000만원 기준 부양가족 1명 대비 3명이면 월 2~4만원 정도 더 받을 수 있습니다.",
  },
  {
    question: "비과세 식대란 무엇이며 실수령액에 어떤 영향을 주나요?",
    answer:
      "비과세 식대는 소득세법에 따라 세금이 부과되지 않는 식사 보조금입니다. 2026년 기준 월 20만원까지 비과세로 인정됩니다. 비과세 식대가 적용되면 과세 대상 급여가 줄어들어 4대보험료와 소득세가 모두 줄어들며, 연간 약 40~50만원의 실수령액 증가 효과가 있습니다.",
  },
  {
    question: "계산 결과가 실제 급여명세서와 다를 수 있나요?",
    answer:
      "네, 본 계산기는 국세청 근로소득 간이세액표를 기준으로 계산하며 실제 급여와 차이가 발생할 수 있습니다. 주요 원인은: 1) 간이세액표는 매월 원천징수용 추정치이며 연말정산 시 조정됩니다. 2) 회사별 비과세 항목(자가운전보조금, 연구활동비 등)이 다릅니다. 3) 개인별 소득공제(신용카드, 의료비 등)는 반영되지 않습니다.",
  },
  {
    question: "4대보험료는 각각 어떻게 계산되나요?",
    answer:
      "2026년 기준 근로자 부담 4대보험 요율: 국민연금 4.75%(상한 302,575원/월), 건강보험 3.595%, 장기요양보험 건강보험의 13.14%, 고용보험 0.9%. 모든 보험료는 세전 급여(비과세 제외)에 해당 요율을 곱해 계산합니다. 사업주도 동일한 금액을 부담합니다.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        자주 묻는 질문
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        연봉 실수령액에 대해 가장 많이 궁금해하는 내용을 모았습니다
      </p>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
              <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                {faq.question}
              </h3>
              <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
