import { authenticated } from "@/cms/utils/access"
import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
  },
  auth: {
    tokenExpiration: 60 * 60 * 24, // 1 day
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
}
