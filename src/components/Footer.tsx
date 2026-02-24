import Link from "next/link";

const POPULAR_AMOUNTS = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">
              2026 연봉 실수령액 계산기
            </h3>
            <p className="text-sm leading-relaxed">
              2026년 최신 4대보험 요율과 국세청 간이세액표를 기준으로 연봉별
              실수령액을 계산합니다. 부양가족 1명(본인), 비과세 없음 기준입니다.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">
              인기 연봉 실수령액
            </h3>
            <ul className="space-y-1.5 text-sm">
              {POPULAR_AMOUNTS.map((amount) => (
                <li key={amount}>
                  <Link
                    href={`/salary/${amount}`}
                    className="hover:text-white transition-colors"
                  >
                    연봉 {amount.toLocaleString("ko-KR")}만원 실수령액
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">
              2026년 4대보험 요율
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>국민연금: 4.75% (근로자 부담)</li>
              <li>건강보험: 3.595% (근로자 부담)</li>
              <li>장기요양: 건강보험의 13.14%</li>
              <li>고용보험: 0.9% (근로자 부담)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-center text-gray-500">
            ※ 본 계산기는 참고용이며, 실제 급여와 차이가 있을 수 있습니다.
            정확한 세금 계산은 국세청 또는 세무 전문가에게 문의하세요.
          </p>
          <p className="text-xs text-center text-gray-600 mt-2">
            &copy; {new Date().getFullYear()} 연봉 실수령액 계산기. 국세청
            간이세액표 기준.
          </p>
        </div>
      </div>
    </footer>
  );
}
