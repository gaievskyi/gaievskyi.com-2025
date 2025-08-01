import { getArticles } from "@/cms/data-access/articles"

export const dynamic = "force-static"

export async function GET() {
  const siteInfo = {
    name: "Daniel Gaievskyi",
    description:
      "Someone who loves mixing different approaches, genres and styles to create unique, innovative experiences. I enjoy pushing boundaries and exploring new ways to express myself without limitations.",
    about:
      "I specialize in creating elegant, user-centered, and visually appealing applications. I combine design expertise with development skills to create highly polished products where every detail matters. I focus on projects where design and code naturally flow together, ensuring nothing gets missed during implementation. I enjoy experimenting with new technologies and approaches, diving in fast and exploring broadly. Whether shaping early ideas, refining production products, or crafting visuals for special moments, I make sure everything feels and looks excellent. Based in Poland, available remotely worldwide.",
    jobTitle: "Design Engineer",
    email: "daniel@gaievskyi.com",
    nationality: "Ukrainian",
    socialLinks: [
      "https://x.com/dgaievskyi",
      "https://t.me/designbeng",
      "https://github.com/gaievskyi",
    ],
    expertise: [
      "Frontend development with modern frameworks (React, Next.js, TypeScript)",
      "Design systems and component libraries",
      "CSS",
      "User interface and user experience design",
      "Performance optimization and accessibility",
      "Design-to-code implementation",
    ],
    philosophy: [
      "Detail-oriented approach to product development",
      "Seamless integration between design and development phases",
      "Focus on user-centered solutions",
      "Commitment to visual excellence and polish",
    ],
    sections: {
      about: [
        "About: Overview of experience, skills and approach",
        "Contact: Direct email for project inquiries and collaboration",
      ],
      publications: ["Articles: Technical articles and design insights"],
      work: [
        "Crafts: UI experiments and explorations",
        "Projects: Showcase of completed projects and case studies",
      ],
    },
  }
  const articles = await getArticles()

  const content = `# ${siteInfo.name}

Last updated: ${new Date().toISOString().split("T")[0]}

${siteInfo.description}

## About
${siteInfo.about}

- Job Title: ${siteInfo.jobTitle}
- Email: ${siteInfo.email}
- Nationality: ${siteInfo.nationality}

## Social Links
${siteInfo.socialLinks.map((link) => `- ${link}`).join("\n")}

## Key Expertise Areas
${siteInfo.expertise.map((exp) => `- ${exp}`).join("\n")}

## Work Philosophy
${siteInfo.philosophy.map((phil) => `- ${phil}`).join("\n")}

## Portfolio Sections

### About
${siteInfo.sections.about.map((item) => `- ${item}`).join("\n")}

### Publications
${siteInfo.sections.publications.map((item) => `- ${item}`).join("\n")}
${articles.map((p) => `- ${new Date(p.publishedAt ?? "").toLocaleDateString()}, ${p.title}: ${p.meta?.description}`).join("\n")}

### Crafts & Projects
${siteInfo.sections.work.map((item) => `- ${item}`).join("\n")}

## Sitemap
https://gaievskyi.com/sitemap.xml
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
