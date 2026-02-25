"use client";

import { useRouter } from "next/navigation";
import {
  salaryData,
  formatNumber,
  formatSalaryLabel,
  type SalaryRow,
} from "@/lib/salary";

const ROWS_PER_SECTION = 30;

function AdSlotRow({ index }: { index: number }) {
  return (
    <tr key={`ad-slot-${index}`}>
      <td colSpan={9} className="align-top p-0">
        <div className="h-[200px] md:h-[120px] w-full" data-ad-slot aria-hidden />
      </td>
    </tr>
  );
}

function TableRow({ row }: { row: SalaryRow }) {
  const router = useRouter();

  return (
    <tr
      role="button"
      tabIndex={0}
      aria-label={`연봉 ${formatSalaryLabel(row.amount)} 상세 보기`}
      onClick={() => router.push(`/salary/${row.amount}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/salary/${row.amount}`);
        }
      }}
      className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors cursor-pointer"
    >
      <td className="px-3 py-3 whitespace-nowrap text-primary-700 font-semibold">
        {formatSalaryLabel(row.amount)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-primary-700 font-bold">
        {formatNumber(row.takeHome)}원
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-red-600 font-semibold">
        -{formatNumber(row.totalDeduction)}원
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden md:table-cell">
        {formatNumber(row.pension)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden md:table-cell">
        {formatNumber(row.health)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden lg:table-cell">
        {formatNumber(row.longCare)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden lg:table-cell">
        {formatNumber(row.employment)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden md:table-cell">
        {formatNumber(row.incomeTax)}
      </td>
      <td className="px-3 py-3 whitespace-nowrap text-gray-600 hidden lg:table-cell">
        {formatNumber(row.localTax)}
      </td>
    </tr>
  );
}

export default function SalaryTable() {
  return (
    <section id="table" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        2026년 연봉별 실수령액 표
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        부양가족 1명(본인), 비과세 없음 기준 · 클릭하면 상세 내역을 확인할 수
        있습니다
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-3 py-3.5 text-left font-semibold">연봉</th>
                <th className="px-3 py-3.5 text-left font-semibold">
                  월 실수령액
                </th>
                <th className="px-3 py-3.5 text-left font-semibold">공제합계</th>
                <th className="px-3 py-3.5 text-left font-semibold hidden md:table-cell">
                  국민연금
                </th>
                <th className="px-3 py-3.5 text-left font-semibold hidden md:table-cell">
                  건강보험
                </th>
                <th className="px-3 py-3.5 text-left font-semibold hidden lg:table-cell">
                  장기요양
                </th>
                <th className="px-3 py-3.5 text-left font-semibold hidden lg:table-cell">
                  고용보험
                </th>
                <th className="px-3 py-3.5 text-left font-semibold hidden md:table-cell">
                  소득세
                </th>
                <th className="px-3 py-3.5 text-left font-semibold hidden lg:table-cell">
                  지방소득세
                </th>
              </tr>
            </thead>
            <tbody>
              {salaryData.flatMap((row, index) => {
                const elements: React.ReactNode[] = [];
                if (index > 0 && index % ROWS_PER_SECTION === 0) {
                  elements.push(
                    <AdSlotRow key={`ad-${index}`} index={index / ROWS_PER_SECTION} />
                  );
                }
                elements.push(<TableRow key={row.amount} row={row} />);
                return elements;
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          행을 클릭하면 해당 연봉의 상세 공제 내역을 확인할 수 있습니다
        </p>
      </div>
    </section>
  );
}
