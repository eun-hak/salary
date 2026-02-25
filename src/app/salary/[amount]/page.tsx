import type { Metadata } from "next";
import Link from "next/link";
import {
  salaryData,
  getSalaryByAmount,
  getAdjacentSalaries,
  formatNumber,
  formatSalaryLabel,
  getMonthlySalary,
  getTakeHomeRate,
  getDeductionRate,
  getAllAmounts,
  type SalaryRow,
} from "@/lib/salary";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

type Params = Promise<{ amount: string }>;

export async function generateStaticParams() {
  return getAllAmounts().map((amount) => ({ amount: String(amount) }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);
  const row = getSalaryByAmount(amount);
  if (!row) return {};

  const label = formatSalaryLabel(amount);
  const takeHome = formatNumber(row.takeHome);

  return {
    title: `연봉 ${label} 실수령액 - 2026년 세후 월급 약 ${takeHome}원`,
    description: `2026년 기준 연봉 ${label}의 월 실수령액은 ${takeHome}원입니다. 국민연금 ${formatNumber(row.pension)}원, 건강보험 ${formatNumber(row.health)}원, 소득세 ${formatNumber(row.incomeTax)}원 등 공제 내역과 실수령율 ${getTakeHomeRate(row)}%를 확인하세요.`,
    alternates: {
      canonical: `https://money.plentyer.com/salary/${amount}`,
    },
    openGraph: {
      title: `연봉 ${label} 실수령액 - 월 ${takeHome}원 (2026년)`,
      description: `2026년 연봉 ${label} 세후 월급 ${takeHome}원. 공제 내역 상세 확인.`,
    },
  };
}

export default async function SalaryDetailPage({
  params,
}: {
  params: Params;
}) {
  const { amount: amountStr } = await params;
  const amount = parseInt(amountStr, 10);
  const row = getSalaryByAmount(amount);

  if (!row) notFound();

  const { prev, next } = getAdjacentSalaries(amount);
  const label = formatSalaryLabel(amount);
  const monthlySalary = getMonthlySalary(amount);
  const takeHomeRate = getTakeHomeRate(row);
  const deductionRate = getDeductionRate(row);

  const deductions = [
    {
      label: "국민연금",
      value: row.pension,
      rate: `${(row.pension / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-blue-500",
      desc: "노후 대비 사회보험 (4.75%)",
    },
    {
      label: "건강보험",
      value: row.health,
      rate: `${(row.health / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-emerald-500",
      desc: "의료 혜택 보험 (3.595%)",
    },
    {
      label: "장기요양",
      value: row.longCare,
      rate: `${(row.longCare / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-teal-400",
      desc: "건강보험의 13.14%",
    },
    {
      label: "고용보험",
      value: row.employment,
      rate: `${(row.employment / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-cyan-500",
      desc: "실업급여 등 (0.9%)",
    },
    {
      label: "소득세",
      value: row.incomeTax,
      rate: `${(row.incomeTax / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-orange-500",
      desc: "간이세액표 기준",
    },
    {
      label: "지방소득세",
      value: row.localTax,
      rate: `${(row.localTax / monthlySalary * 100).toFixed(1)}%`,
      color: "bg-amber-400",
      desc: "소득세의 10%",
    },
  ];

  const maxDeduction = Math.max(...deductions.map((d) => d.value), 1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `연봉 ${label} 실수령액 - 2026년 기준`,
    description: `2026년 연봉 ${label} 세후 월 실수령액 ${formatNumber(row.takeHome)}원`,
    url: `https://money.plentyer.com/salary/${amount}`,
    mainEntity: {
      "@type": "FinancialProduct",
      name: `연봉 ${label} 실수령액 계산`,
      description: `월 실수령액 ${formatNumber(row.takeHome)}원, 공제 합계 ${formatNumber(row.totalDeduction)}원`,
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
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            전체 연봉 실수령액 표
          </Link>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            연봉 {label} 실수령액
          </h1>
          <p className="text-gray-400 mt-2">
            2026년 기준 · 부양가족 1명(본인) · 비과세 없음
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            label="월 실수령액"
            value={`${formatNumber(row.takeHome)}원`}
            accent="text-primary-700"
          />
          <StatCard
            label="월 공제액"
            value={`-${formatNumber(row.totalDeduction)}원`}
            accent="text-red-600"
          />
          <StatCard
            label="실수령율"
            value={`${takeHomeRate}%`}
            accent="text-emerald-600"
          />
          <StatCard
            label="월 세전 급여"
            value={`${formatNumber(monthlySalary)}원`}
            accent="text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">
              공제 항목별 상세 내역
            </h2>
            <div className="space-y-3">
              {deductions.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between items-baseline text-sm mb-1">
                    <div>
                      <span className="font-medium text-gray-800">
                        {d.label}
                      </span>
                      <span className="text-gray-400 text-xs ml-2">
                        {d.desc}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">
                        {formatNumber(d.value)}원
                      </span>
                      <span className="text-gray-400 text-xs ml-1.5">
                        ({d.rate})
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full`}
                      style={{
                        width: `${(d.value / maxDeduction) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-bold text-sm">
              <span className="text-gray-700">공제 합계</span>
              <span className="text-red-600">
                -{formatNumber(row.totalDeduction)}원 ({deductionRate}%)
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">연간 요약</h2>
            <div className="space-y-3">
              <SummaryRow
                label="연봉 (세전)"
                value={`${formatNumber(amount * 10000)}원`}
              />
              <SummaryRow
                label="연간 실수령액"
                value={`${formatNumber(row.takeHome * 12)}원`}
                bold
              />
              <SummaryRow
                label="연간 공제 합계"
                value={`-${formatNumber(row.totalDeduction * 12)}원`}
                red
              />
              <div className="border-t border-gray-100 my-2" />
              <SummaryRow
                label="연간 4대보험"
                value={`${formatNumber((row.pension + row.health + row.longCare + row.employment) * 12)}원`}
              />
              <SummaryRow
                label="연간 소득세+지방세"
                value={`${formatNumber((row.incomeTax + row.localTax) * 12)}원`}
              />
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">
                급여의 실수령 비율
              </p>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-primary-600 h-full rounded-l-full"
                  style={{ width: `${takeHomeRate}%` }}
                />
                <div
                  className="bg-red-400 h-full rounded-r-full"
                  style={{ width: `${deductionRate}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-primary-700 font-medium">
                  실수령 {takeHomeRate}%
                </span>
                <span className="text-red-500 font-medium">
                  공제 {deductionRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {(prev || next) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">
              인접 연봉 비교
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                      연봉
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      월 실수령액
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      월 공제액
                    </th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">
                      차이
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prev && (
                    <ComparisonRow
                      row={prev}
                      diff={row.takeHome - prev.takeHome}
                      current={false}
                    />
                  )}
                  <ComparisonRow row={row} diff={0} current />
                  {next && (
                    <ComparisonRow
                      row={next}
                      diff={next.takeHome - row.takeHome}
                      current={false}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-3 mb-8">
          {prev && (
            <Link
              href={`/salary/${prev.amount}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              ← 연봉 {formatSalaryLabel(prev.amount)}
            </Link>
          )}
          <Link
            href="/"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
          >
            전체 표 보기
          </Link>
          {next && (
            <Link
              href={`/salary/${next.amount}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              연봉 {formatSalaryLabel(next.amount)} →
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg md:text-xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  bold,
  red,
}: {
  label: string;
  value: string;
  bold?: boolean;
  red?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span
        className={`${bold ? "font-bold text-primary-700" : ""} ${red ? "font-bold text-red-600" : ""} ${!bold && !red ? "text-gray-800" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function ComparisonRow({
  row,
  diff,
  current,
}: {
  row: SalaryRow;
  diff: number;
  current: boolean;
}) {
  return (
    <tr
      className={`border-b border-gray-100 ${current ? "bg-primary-50 font-semibold" : ""}`}
    >
      <td className="py-2.5 pr-3">
        {current ? (
          <span className="text-primary-700">
            {formatSalaryLabel(row.amount)}
          </span>
        ) : (
          <Link
            href={`/salary/${row.amount}`}
            className="text-primary-600 hover:underline"
          >
            {formatSalaryLabel(row.amount)}
          </Link>
        )}
      </td>
      <td className="py-2.5 px-3">{formatNumber(row.takeHome)}원</td>
      <td className="py-2.5 px-3 text-red-600">
        -{formatNumber(row.totalDeduction)}원
      </td>
      <td className="py-2.5 px-3">
        {current ? (
          <span className="text-gray-400">—</span>
        ) : (
          <span className={diff > 0 ? "text-emerald-600" : "text-red-500"}>
            {diff > 0 ? "+" : ""}
            {formatNumber(diff)}원
          </span>
        )}
      </td>
    </tr>
  );
}
