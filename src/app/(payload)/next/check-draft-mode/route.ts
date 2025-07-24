import { draftMode } from "next/headers"

export async function GET(): Promise<Response> {
  const { isEnabled: isDraft } = await draftMode()
  return new Response(JSON.stringify({ isDraft }))
}
