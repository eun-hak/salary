"use client";

import { useState, useMemo } from "react";
import { calculateSalary, formatNumber, getTakeHomeRate } from "@/lib/salary";

const QUICK_AMOUNTS = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

export default function SalaryCalculator() {
  const [salaryInput, setSalaryInput] = useState("5000");
  const [dependents, setDependents] = useState(1);
  const [nonTaxable, setNonTaxable] = useState(0);

  const annualWon = useMemo(() => {
    const num = parseInt(salaryInput.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num * 10000;
  }, [salaryInput]);

  const result = useMemo(() => {
    if (annualWon <= 0) return null;
    return calculateSalary(annualWon, dependents, nonTaxable);
  }, [annualWon, dependents, nonTaxable]);

  const takeHomeRate = result ? getTakeHomeRate(result) : 0;

  const deductions = result
    ? [
        { label: "국민연금", value: result.pension, color: "bg-blue-500" },
        { label: "건강보험", value: result.health, color: "bg-emerald-500" },
        { label: "장기요양", value: result.longCare, color: "bg-teal-400" },
        { label: "고용보험", value: result.employment, color: "bg-cyan-500" },
        { label: "소득세", value: result.incomeTax, color: "bg-orange-500" },
        { label: "지방소득세", value: result.localTax, color: "bg-amber-400" },
      ]
    : [];

  const maxDeduction = Math.max(...deductions.map((d) => d.value), 1);

  return (
    <section id="calculator" className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            실수령액 계산기
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                연봉 (만원)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={salaryInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, "");
                  setSalaryInput(v);
                }}
                placeholder="예: 5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                부양가족 수 (본인 포함)
              </label>
              <select
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}명
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                비과세 식대 (월)
              </label>
              <select
                value={nonTaxable}
                onChange={(e) => setNonTaxable(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition bg-white"
              >
                <option value={0}>없음</option>
                <option value={100000}>10만원</option>
                <option value={200000}>20만원</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => setSalaryInput(String(amt))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  salaryInput === String(amt)
                    ? "bg-primary-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {amt >= 10000
                  ? `${amt / 10000}억`
                  : `${formatNumber(amt)}만`}
              </button>
            ))}
          </div>

          {result && annualWon > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6">
                <p className="text-sm text-gray-500 mb-1">월 실수령액</p>
                <p className="text-3xl md:text-4xl font-extrabold text-primary-700 mb-3">
                  {formatNumber(result.takeHome)}
                  <span className="text-lg font-medium text-gray-500 ml-1">
                    원
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-gray-500">월 공제액</p>
                    <p className="text-lg font-bold text-red-600">
                      -{formatNumber(result.totalDeduction)}원
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-gray-500">실수령율</p>
                    <p className="text-lg font-bold text-primary-700">
                      {takeHomeRate}%
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-gray-500">연 실수령액</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatNumber(result.takeHome * 12)}원
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3">
                    <p className="text-gray-500">월 세전 급여</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatNumber(Math.round(annualWon / 12))}원
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  공제 항목별 내역
                </p>
                <div className="space-y-2.5">
                  {deductions.map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{d.label}</span>
                        <span className="font-semibold text-gray-800">
                          {formatNumber(d.value)}원
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${d.color} rounded-full transition-all duration-500`}
                          style={{
                            width: `${(d.value / maxDeduction) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
