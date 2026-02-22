import { useState, useMemo } from "react";
import { salaryData, SalaryRow } from "./data/salaryData";

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

const HEADERS = [
  "연봉",
  "실수령액",
  "공제액계",
  "국민연금",
  "건강보험",
  "장기요양",
  "고용보험",
  "소득세",
  "지방소득세",
];

export default function App() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.replace(/[^0-9]/g, "");
    if (!q) return salaryData;
    return salaryData.filter((row) =>
      row.salary.replace(/[^0-9]/g, "").startsWith(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[960px] mx-auto px-4 py-6 text-center">
          <h1 className="text-gray-900 mb-1">2026년 연봉 실수령액 표</h1>
          <p className="text-xs text-gray-400 mb-4">
            부양가족 1명(본인), 비과세 없음 기준 · 2026년 기준
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="연봉 검색 (예: 5000)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[960px] mx-auto pb-12">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white text-sm">
            <thead>
              <tr className="bg-gray-700 text-white">
                {HEADERS.map((h, idx) => (
                  <th
                    key={h}
                    className={[
                      "px-3 py-3 text-left whitespace-nowrap",
                      idx !== HEADERS.length - 1 ? "border-r border-gray-600" : "",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-10 text-gray-400"
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <TableRow key={row.salary} row={row} isEven={i % 2 === 0} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-xs text-gray-400">
        <p>※ 본 자료는 참고용이며 실제 공제액과 다를 수 있습니다.</p>
      </div>
    </div>
  );
}

function TableRow({ row, isEven }: { row: SalaryRow; isEven: boolean }) {
  return (
    <tr
      className={[
        "border-b border-gray-200 cursor-default transition-colors duration-100",
        "hover:bg-blue-50",
        isEven ? "bg-white" : "bg-gray-50",
      ].join(" ")}
    >
      <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-semibold">
        {row.salary}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-blue-700 font-semibold">
        {formatNumber(row.takeHome)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-red-600 font-semibold">
        {formatNumber(row.totalDeduction)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.pension)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.health)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.longCare)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.employment)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.incomeTax)}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-gray-700">
        {formatNumber(row.localTax)}
      </td>
    </tr>
  );
}
