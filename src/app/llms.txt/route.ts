import { getArticles } from "@/cms/data-access/articles"
import { getProjects } from "@/cms/data-access/projects"
import { getServerSideURL } from "@/lib/get-url"

export const dynamic = "force-static"

export async function GET() {
  const articles = await getArticles()
  const projects = await getProjects()
  const url = getServerSideURL()

  const siteInfo = {
    name: "Daniel Gaievskyi",
    description:
      "Someone who loves mixing different approaches, genres and styles to create unique, innovative experiences. I enjoy pushing boundaries and exploring new ways to express myself without limitations.",
    jobTitle: "Design Engineer",
    email: "daniel@gaievskyi.com",
    socialLinks: [
      "[X](https://x.com/dgaievskyi)",
      "[Telegram](https://t.me/designbeng)",
      "[GitHub](https://github.com/gaievskyi)",
    ],
    sections: {
      about:
        "I develop elegant, user-centered, and visually appealing applications. I like projects where design and code naturally flow together. I’m drawn to experiments. I dive in fast, and explore broadly. Whether I’m shaping early ideas, refining products in production, or crafting visuals for one-off moments, I make sure everything feels and looks excellent. If you share this vision, and are looking for a partner to push your product forward, reach out at @dgaievskyi or daniel@gaievskyi.com. Based in Poland, available remotely worldwide.",
      contact:
        "[Email](mailto:daniel@gaievskyi.com). Based in Poland, available remotely worldwide.",
      articles: articles
        .map(
          (a) =>
            `- ${new Date(a.publishedAt ?? "").toLocaleDateString()} [${a.title}](${url}/blog/${a.slug}): ${a.meta?.description}`,
        )
        .join("\n"),
      crafts: [
        `[Fractional Slider](${url}/crafts/fractional-slider)`,
        `[iOS Slider](${url}/crafts/ios-slider)`,
        `[Radial Menu](${url}/crafts/radial-menu)`,
        `[Dynamic Island](${url}/crafts/dynamic-island)`,
        `[Vercel Badge](${url}/crafts/vercel-badge)`,
        `[Family Transactions](${url}/crafts/family-transactions)`,
      ],
      projects: projects
        .map(
          (p) =>
            `- ${new Date(p.createdAt).toLocaleDateString()} [${p.title}](${url}/projects/${p.slug})`,
        )
        .join("\n"),
    },
  }

  const content = `# ${siteInfo.name} - ${siteInfo.jobTitle}

${siteInfo.description}

## Website

### About
${siteInfo.sections.about}

${siteInfo.socialLinks.map((link) => `- ${link}`).join("\n")}

### Contact
${siteInfo.sections.contact}

### Publications
${siteInfo.sections.articles}

### Crafts
${siteInfo.sections.crafts.map((craft) => `- ${craft}`).join("\n")}

### Projects
${siteInfo.sections.projects}

Last updated: ${new Date().toISOString().split("T")[0]}
`
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
