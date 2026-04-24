import type { APIGatewayProxyHandler } from 'aws-lambda'
import { readMarkdownFiles } from '../../lib/content'
import { ok, serverError, options } from '../../lib/response'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return options()

  try {
    const studies = await readMarkdownFiles('case-studies')
    studies.sort((a, b) =>
      new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
    )
    const items = studies.map(({ body: _body, ...rest }) => rest)
    return ok(items, { total: items.length })
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
