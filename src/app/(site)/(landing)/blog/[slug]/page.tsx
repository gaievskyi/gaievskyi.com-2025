import { getArticle, getArticlesSlugs } from "@/cms/data-access/articles"
import { DraftIndicator } from "@/cms/draft-indicator"
import { LivePreviewListener } from "@/cms/live-preview-listener"
import { RichText } from "@/cms/rich-text"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Illustration } from "@/components/ui/illustration"
import { generateTableOfContents } from "@/components/ui/table-of-contents/generate-toc"
import { BackAside } from "@/components/back-aside"
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import type { Metadata } from "next"
import type { Article, WithContext } from "schema-dts"
import { personJsonLd } from "@/app/(site)/(landing)/page"

export async function generateStaticParams() {
  const slugs = await getArticlesSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

const getArticleJsonLd = async (slug: string) => {
  const article = await getArticle(slug)
  const ld: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    name: article.title,
    description: article.meta?.description || undefined,
    author: personJsonLd,
    url: `https://gaievskyi.com/blog/${slug}`,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || undefined,
    inLanguage: "en-US",
    isFamilyFriendly: true,
    genre: "Technology",
    isPartOf: {
      "@type": "WebSite",
      name: "Daniel Gaievskyi",
      url: "https://gaievskyi.com",
    },
    audience: "Developers",
  }
  return ld
}

export async function generateMetadata({
  params: paramsPromise,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await paramsPromise
  const article = await getArticle(slug)
  return {
    title: article.meta?.title,
    description: article.meta?.description,
    openGraph: {
      title: article.title,
      description: article.meta?.description || undefined,
      siteName: "@dgaievskyi",
      type: "article",
      publishedTime: article.publishedAt || undefined,
      authors: ["Daniel Gaievskyi"],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) {
    return notFound()
  }
  const articleJsonLd = await getArticleJsonLd(slug)
  const { isEnabled: isDraft } = await draftMode()
  const tocItems = generateTableOfContents(article.content)
  return (
    <>
      <script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LivePreviewListener />
      {isDraft && <DraftIndicator />}
      <div className="relative min-h-screen">
        <div className="px-4 pt-4 lg:hidden">
          <BackAside>
            <TableOfContents
              containerSelector="article"
              items={tocItems}
              className="py-8"
            />
          </BackAside>
        </div>
        <div className="pb-28 lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-6 lg:px-6 lg:pt-4">
          <div className="hidden lg:block">
            <BackAside>
              <TableOfContents
                containerSelector="article"
                className="mt-32"
                items={tocItems}
              />
            </BackAside>
          </div>
          <Flex justify="center" className="px-6 lg:px-0">
            <article className="container w-full">
              <header className="mt-8 mb-12">
                {article.illustration &&
                  typeof article.illustration !== "number" && (
                    <Illustration src={article.illustration} />
                  )}
                <Flex direction="col" gap="xs">
                  <Heading size="xl" weight="medium" className="tracking-tight">
                    {article.title}
                  </Heading>
                  {article.publishedAt && (
                    <Text size="sm" color="muted">
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(article.publishedAt))}
                    </Text>
                  )}
                </Flex>
              </header>
              <RichText data={article.content} enableGutter={false} />
            </article>
          </Flex>
        </div>
      </div>
    </>
  )
}
