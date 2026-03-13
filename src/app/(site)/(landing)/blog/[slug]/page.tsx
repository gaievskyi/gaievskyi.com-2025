import { personJsonLd } from "@/app/(site)/(landing)/page"
import { getArticle, getArticlesSlugs } from "@/cms/data-access/articles"
import { DraftIndicator } from "@/cms/draft-indicator"
import { LivePreviewListener } from "@/cms/live-preview-listener"
import { RichText } from "@/cms/rich-text"
import { Aside } from "@/components/aside"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HapticLink } from "@/components/ui/haptic-link"
import { Icon } from "@/components/ui/icon"
import { Illustration } from "@/components/ui/illustration"
import { Flex } from "@/components/ui/layout/flex"
import { generateTableOfContents } from "@/components/ui/table-of-contents/generate-toc"
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import Script from "next/script"
import type { Article, WithContext } from "schema-dts"

export async function generateStaticParams() {
  const slugs = await getArticlesSlugs()
  return slugs.map(({ slug }) => ({ slug }))
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
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
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

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
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
      <LivePreviewListener />
      {isDraft && <DraftIndicator />}
      <div className="relative min-h-screen">
        <div className="pb-28 lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-6 lg:px-6 lg:pt-4">
          <div className="fixed top-0 left-0 z-51 hidden md:block lg:static">
            <Aside expandable>
              <Text size="sm" weight="medium" className="mt-6 mb-4">
                {article.title}
              </Text>
              <TableOfContents containerSelector="article" items={tocItems} />
            </Aside>
          </div>
          <Flex as="main" justify="center" className="px-6 lg:px-0">
            <article className="container w-full">
              <TableOfContents
                containerSelector="article"
                items={tocItems}
                className="py-8 md:hidden"
              />
              <header className="mt-8 mb-20">
                <Flex
                  align="start"
                  justify="between"
                  className="mb-6 flex-col gap-1 sm:flex-row sm:items-center"
                >
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink render={<HapticLink href="/" />}>
                          <Icon name="sprite:arrow-back" className="size-4.5" />{" "}
                          Index
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>Blog</BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          <Heading weight="medium" className="tracking-tight">
                            {article.title}
                          </Heading>
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  {article.publishedAt && (
                    <time
                      dateTime={article.publishedAt}
                      className="text-xs text-muted-foreground sm:text-sm sm:whitespace-nowrap"
                    >
                      {Intl.DateTimeFormat(undefined, {
                        dateStyle: "long",
                      }).format(new Date(article.publishedAt))}
                    </time>
                  )}
                </Flex>
                {article.illustration &&
                  typeof article.illustration !== "number" && (
                    <Illustration src={article.illustration} />
                  )}
              </header>
              <RichText data={article.content} enableGutter={false} />
            </article>
          </Flex>
        </div>
      </div>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}
