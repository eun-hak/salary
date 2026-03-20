import type { MetadataRoute } from "next";
import { getAllAmounts } from "@/lib/salary";

const SITE_URL = "https://money.plentyer.com";
const LAST_MODIFIED = new Date("2026-03-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const amounts = getAllAmounts();

  const salaryPages: MetadataRoute.Sitemap = amounts.map((amount) => ({
    url: `${SITE_URL}/salary/${amount}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const familyPages: MetadataRoute.Sitemap = [1, 2, 3, 4, 5].map((count) => ({
    url: `${SITE_URL}/family/${count}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const mealPages: MetadataRoute.Sitemap = [0, 100000, 200000].map(
    (amount) => ({
      url: `${SITE_URL}/meal/${amount}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  const guidePages: MetadataRoute.Sitemap = [
    "insurance-rates",
    "income-tax",
    "non-taxable-meal",
    "dependents",
    "how-to-increase",
  ].map((slug) => ({
    url: `${SITE_URL}/guide/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...salaryPages,
    ...familyPages,
    ...mealPages,
    ...guidePages,
  ];
}
