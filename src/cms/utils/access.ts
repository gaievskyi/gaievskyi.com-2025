import type { Access } from "payload"

export const anyone: Access = () => {
  return true
}

export const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }
  return {
    _status: {
      equals: "published",
    },
  }
}
