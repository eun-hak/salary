import Link from "next/link";
import {
  salaryData,
  formatNumber,
  formatSalaryLabel,
  type SalaryRow,
} from "@/lib/salary";

const SUMMARY_AMOUNTS = new Set([
  1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500,
  7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000,
  15000,
]);

function TableRow({ row }: { row: SalaryRow }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
      <td className="px-3 py-3 whitespace-nowrap">
        <Link
          href={`/salary/${row.amount}`}
          className="text-primary-700 font-semibold hover:underline"
        >
          {formatSalaryLabel(row.amount)}
        </Link>
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

export default function SalaryTable({ showAll = false }: { showAll?: boolean }) {
  const rows = showAll
    ? salaryData
    : salaryData.filter((row) => SUMMARY_AMOUNTS.has(row.amount));

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
              {rows.map((row) => (
                <TableRow key={row.amount} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!showAll && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            100만원 단위 상세 표는 각 연봉을 클릭하여 확인하세요
          </p>
        </div>
      )}
    </section>
  );
}
