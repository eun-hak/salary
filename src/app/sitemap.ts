import type { MetadataRoute } from "next";
import { getAllAmounts } from "@/lib/salary";

const SITE_URL = "https://salary2026.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const amounts = getAllAmounts();

  const salaryPages: MetadataRoute.Sitemap = amounts.map((amount) => ({
    url: `${SITE_URL}/salary/${amount}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    ...salaryPages,
  ];
}
