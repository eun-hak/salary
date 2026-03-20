import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://money.plentyer.com/guide/${slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url: `https://money.plentyer.com/guide/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "연봉 실수령액 계산기",
      url: "https://money.plentyer.com",
    },
    datePublished: "2026-01-01",
    dateModified: "2026-03-20",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "홈",
          item: "https://money.plentyer.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "가이드",
          item: "https://money.plentyer.com/guide",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: guide.title,
          item: `https://money.plentyer.com/guide/${slug}`,
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition">
              연봉 실수령액 계산기
            </Link>
            <span>/</span>
            <span>가이드</span>
            <span>/</span>
            <span className="text-gray-300">{guide.title}</span>
          </nav>
          <div className="inline-block bg-white/10 text-xs font-medium rounded-full px-3 py-1 mb-4">
            가이드
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {guide.title}
          </h1>
          <p className="text-gray-400 mt-3 text-sm md:text-base max-w-2xl leading-relaxed">
            {guide.summary}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 목차 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">목차</h2>
          <ol className="space-y-1">
            {guide.sections.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {i + 1}. {section.heading}
                </a>
              </li>
            ))}
            {guide.faq.length > 0 && (
              <li>
                <a
                  href="#faq"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {guide.sections.length + 1}. 자주 묻는 질문
                </a>
              </li>
            )}
          </ol>
        </div>

        {/* 본문 섹션 */}
        <div className="space-y-6 mb-8">
          {guide.sections.map((section, i) => (
            <div
              key={i}
              id={`section-${i}`}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-sm text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        {guide.faq.length > 0 && (
          <div
            id="faq"
            className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {guide.faq.map((item, i) => (
                <details
                  key={i}
                  className="group border border-gray-100 rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-sm font-semibold text-gray-800 pr-4">
                      {item.question}
                    </h3>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
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
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* 관련 페이지 */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-4">관련 페이지</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {guide.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <span>→</span> {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 다른 가이드 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">다른 가이드 보기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                slug: "insurance-rates",
                label: "2026 4대보험 요율 가이드",
              },
              { slug: "income-tax", label: "근로소득세 계산 방법" },
              { slug: "non-taxable-meal", label: "비과세 식대 활용 가이드" },
              { slug: "dependents", label: "부양가족 공제 가이드" },
              { slug: "how-to-increase", label: "실수령액 높이는 5가지 방법" },
            ]
              .filter((g) => g.slug !== slug)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition"
                >
                  {g.label}
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
