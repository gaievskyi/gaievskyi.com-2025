import { getArticle, getArticlesSlugs } from "@/cms/data-access/articles"
import { DraftIndicator } from "@/components/draft-indicator"
import { LivePreviewListener } from "@/components/live-preview-listener"
import { RichText } from "@/components/rich-text"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Illustration } from "@/components/ui/illustration"
import { generateTableOfContents } from "@/components/ui/table-of-contents/generate-toc"
import { BackAside } from "@/components/back-aside"
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents"

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getArticlesSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug = "" } = await params
  const article = await getArticle(slug)
  if (!article) {
    return notFound()
  }
  const { isEnabled: isDraft } = await draftMode()
  const tocItems = generateTableOfContents(article.content)
  return (
    <>
      <LivePreviewListener />
      {isDraft && <DraftIndicator />}
      <div className="min-h-screen">
        <div className="relative">
          <div className="px-4 pt-4 lg:hidden">
            <BackAside>
              <TableOfContents containerSelector="article" items={tocItems} />
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
            <div className="flex justify-center px-6 lg:px-0">
              <article className="container w-full">
                <header className="mt-8 mb-12">
                  {article.illustration &&
                    typeof article.illustration !== "number" && (
                      <Illustration src={article.illustration} />
                    )}
                  <div>
                    <h1 className="text-2xl leading-tight font-medium tracking-tight text-pretty">
                      {article.title}
                    </h1>
                    {article.publishedAt && (
                      <p className="mt-2 text-sm text-zinc-500">
                        {Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(article.publishedAt))}
                      </p>
                    )}
                  </div>
                </header>
                <RichText data={article.content} enableGutter={false} />
              </article>
            </div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </>
  )
}
