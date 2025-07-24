import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { getServerSideURL } from "@/lib/get-url"
import type { Article, Project } from "./payload-types"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Articles } from "./src/cms/collections/articles"
import { Media } from "./src/cms/collections/media"
import { Projects } from "./src/cms/collections/projects"
import { Users } from "./src/cms/collections/users"
import { isDevelopment } from "@/lib/constants"
import { Videos } from "@/cms/collections/videos"
import { Labs } from "@/cms/collections/labs"
import { env } from "./env/env"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: "/src/" + path.resolve(dirname),
    },
    autoLogin: isDevelopment
      ? {
          email: "dev@payloadcms.com",
          password: "development1337",
          prefillOnly: true,
        }
      : false,
  },
  collections: [Users, Media, Videos, Articles, Projects, Labs],
  editor: lexicalEditor(),
  cors: [getServerSideURL()].filter(Boolean),
  // getting 403 and 504 on vercel blob upload
  // csrf: [getServerSideURL()].filter(Boolean),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  graphQL: { disable: true },
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
        // TODO
        // videos: true,
      },
      token: env.BLOB_READ_WRITE_TOKEN,
    }),
    payloadCloudPlugin(),
    seoPlugin({
      generateTitle: ({ doc }: { doc: Article | Project }) => {
        return doc?.title
          ? `${doc.title} | Daniel Gaievskyi`
          : "Read Daniel Gaievskyi"
      },
      generateURL: ({ doc }: { doc: Article | Project }) => {
        const url = getServerSideURL()
        return doc?.slug ? `${url}/${doc.slug}` : url
      },
    }),
  ],
  async onInit(payload) {
    if (!isDevelopment) return
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    })
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "dev@payloadcms.com",
          password: "development1337",
          name: "Developer",
        },
      })
    }
  },
})
