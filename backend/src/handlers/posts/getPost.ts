import type { APIGatewayProxyHandler } from 'aws-lambda'
import { readMarkdownFile } from '../../lib/content'
import { ok, notFound, serverError, options } from '../../lib/response'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return options()

  try {
    const slug = event.pathParameters?.slug
    if (!slug) return notFound()

    // Try both directories
    const post = await readMarkdownFile('thoughts', slug) ?? await readMarkdownFile('personal', slug)
    if (!post) return notFound(`Post "${slug}" not found`)

    return ok(post)
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
