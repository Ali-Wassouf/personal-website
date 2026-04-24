import type { APIGatewayProxyHandler } from 'aws-lambda'
import { readMarkdownFile } from '../../lib/content'
import { ok, notFound, serverError, options } from '../../lib/response'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return options()

  try {
    const slug = event.pathParameters?.slug
    if (!slug) return notFound()

    const study = await readMarkdownFile('case-studies', slug)
    if (!study) return notFound(`Case study "${slug}" not found`)

    return ok(study)
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
