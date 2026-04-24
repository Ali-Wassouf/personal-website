import type { APIGatewayProxyHandler } from 'aws-lambda'
import { readMarkdownFiles } from '../../lib/content'
import { ok, serverError, options } from '../../lib/response'

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return options()

  try {
    const { category, page = '1', limit = '20' } = event.queryStringParameters ?? {}

    const thoughts = await readMarkdownFiles('thoughts')
    const personal = await readMarkdownFiles('personal')

    let posts = [...thoughts, ...personal]

    if (category === 'thoughts') posts = thoughts
    else if (category === 'personal') posts = personal

    posts.sort((a, b) =>
      new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
    )

    const pageNum = Math.max(1, parseInt(page, 10))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)))
    const total = posts.length
    const paginated = posts.slice((pageNum - 1) * limitNum, pageNum * limitNum)

    // Strip body from list view
    const items = paginated.map(({ body: _body, ...rest }) => rest)

    return ok(items, { total, page: pageNum, limit: limitNum })
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
