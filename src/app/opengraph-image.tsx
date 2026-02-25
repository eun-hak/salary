import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "2026년 연봉 실수령액 계산기 - 세후 월급 & 공제 내역";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%)",
          padding: 48,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Left: Title & description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1,
            maxWidth: 560,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 999,
              width: "fit-content",
              fontSize: 14,
              color: "#94a3b8",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            2026년 최신 요율 반영
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            연봉 실수령액 계산기
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              color: "#cbd5e1",
              lineHeight: 1.5,
            }}
          >
            4대보험·소득세 자동 계산 | 연봉 1천만원 ~ 1억 5천만원
          </p>
        </div>

        {/* Right: Result card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            borderRadius: 16,
            padding: 32,
            width: 380,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "#64748b",
              marginBottom: 8,
            }}
          >
            연봉 5,000만원
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1e40af",
              marginBottom: 20,
            }}
          >
            월 실수령액 3,573,716원
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "국민연금", value: "188,380원", color: "#3b82f6" },
              { label: "건강보험", value: "142,600원", color: "#10b981" },
              { label: "소득세", value: "188,690원", color: "#f97316" },
              { label: "고용보험", value: "35,690원", color: "#ef4444" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 15,
                  color: "#334155",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                  {item.label}
                </span>
                <span style={{ fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
