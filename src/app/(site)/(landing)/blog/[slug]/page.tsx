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
                    <h1 className="text-2xl leading-tight font-medium tracking-tight text-pretty lg:text-3xl">
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
                <div className="prose prose-base max-w-none dark:prose-invert prose-headings:font-medium prose-headings:leading-loose prose-h1:text-xl prose-h2:text-lg prose-h3:text-lg prose-h4:text-lg prose-p:text-base prose-p:leading-7 prose-p:text-zinc-600 dark:prose-p:text-[#bbbbbb] prose-blockquote:border-l-zinc-300 prose-blockquote:text-zinc-600 dark:prose-blockquote:border-l-zinc-700 dark:prose-blockquote:text-zinc-400 prose-strong:text-zinc-900 dark:prose-strong:text-[#d1d1d1] prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-medium prose-code:text-zinc-900 prose-code:outline prose-code:outline-dashed prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-100 prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-900 dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-950 prose-li:text-[15px] dark:prose-li:text-[#bbbbbb] prose-ul:list-none prose-li:relative prose-li:pl-6 prose-li:before:content-['-'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-zinc-400 dark:prose-li:before:text-zinc-500 dark:prose-hr:border-zinc-700 prose-hr:border-dashed">
                  <RichText data={article.content} enableGutter={false} />
                </div>
              </article>
            </div>
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </>
  )
}
